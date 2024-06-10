class Endboss extends MoveableObject {
    hit;
    power = 100;
    i = 1;
    IMAGES_WALK = [
        `img/4_enemie_boss_chicken/1_walk/G1.png`,
        `img/4_enemie_boss_chicken/1_walk/G2.png`,
        `img/4_enemie_boss_chicken/1_walk/G3.png`,
        `img/4_enemie_boss_chicken/1_walk/G4.png`
    ];

    IMAGES_ALERT = [
        `img/4_enemie_boss_chicken/2_alert/G5.png`,
        `img/4_enemie_boss_chicken/2_alert/G6.png`,
        `img/4_enemie_boss_chicken/2_alert/G7.png`,
        `img/4_enemie_boss_chicken/2_alert/G8.png`,
        `img/4_enemie_boss_chicken/2_alert/G9.png`,
        `img/4_enemie_boss_chicken/2_alert/G10.png`,
        `img/4_enemie_boss_chicken/2_alert/G11.png`,
        `img/4_enemie_boss_chicken/2_alert/G12.png`
    ];

    IMAGES_ATTACK = [
        `img/4_enemie_boss_chicken/3_attack/G13.png`,
        `img/4_enemie_boss_chicken/3_attack/G14.png`,
        `img/4_enemie_boss_chicken/3_attack/G15.png`,
        `img/4_enemie_boss_chicken/3_attack/G16.png`,
        `img/4_enemie_boss_chicken/3_attack/G17.png`,
        `img/4_enemie_boss_chicken/3_attack/G18.png`,
        `img/4_enemie_boss_chicken/3_attack/G19.png`,
        `img/4_enemie_boss_chicken/3_attack/G20.png`
    ];

    IMAGES_HURT = [
        `img/4_enemie_boss_chicken/4_hurt/G21.png`,
        `img/4_enemie_boss_chicken/4_hurt/G22.png`,
        `img/4_enemie_boss_chicken/4_hurt/G23.png`
    ];

    IMAGES_DEAD = [
        `img/4_enemie_boss_chicken/4_hurt/G21.png`,
        `img/4_enemie_boss_chicken/4_hurt/G22.png`,
        `img/4_enemie_boss_chicken/4_hurt/G23.png`,
        `img/4_enemie_boss_chicken/4_hurt/G21.png`,
        `img/4_enemie_boss_chicken/4_hurt/G22.png`,
        `img/4_enemie_boss_chicken/4_hurt/G23.png`,
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`,
        `img/4_enemie_boss_chicken/5_dead/G26.png`
    ];
    world;
    walking_sound = new Audio('./audio/bossrunning.mp3');
    alert_sound = new Audio('./audio/chicken_boss.mp3');
    hurt_sound = new Audio('./audio/hurtBoss.mp3');
    constructor() {
        super().loadImage(`img/4_enemie_boss_chicken/2_alert/G5.png`);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2350;
        this.y = -20;
        this.height = 500;
        this.width = 500;
        this.animation();
    }

    time = 0;
    walktime = 100;
    timeAttack = 150;

    animation() {
        this.walking_sound.pause();
        this.alert_sound.pause();
        this.hurt_sound.pause();
        setInterval(() => this.bossAnimation(), 100);
    }

    bossAnimation() {
        if (this.endBossHurtCheck()) {
            this.endBossHurt();
        } else if (this.checkRunEndBoss()) {
            this.endBossRun();
        } else if (this.checkAttack()) {
            this.dontAttack();
        } else {
            this.attack();
        }
    }

    checkAttack() {
        return this.timeAttack == 150 && this.time <= 150 && this.walktime <= 0;
    }

    attack() {
        if (this.canAttack()) {
            this.startAttack();
        } else {
            if (this.canDontAttack()) this.stopAttack();
        }
    }

    canAttack() {
        return this.timeAttack != 0;
    }

    canDontAttack() {
        return this.timeAttack <= 0;
    }

    startAttack() {
        this.timeAttack -= 5;
        if (this.world.character.x > 1900 && this.power > 0) {
            this.walking_sound.pause();
            this.alert_sound.pause();
            this.hurt_sound.pause();
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    stopAttack() {
        this.timeAttack = 150;
        this.time = 0;
        this.walktime = 100;
    }

    dontAttack() {
        this.time += 1;
        if (this.checkEndBossPower()) this.playAnimation(this.IMAGES_ALERT);
        if (this.checkCharacterInPosition()) this.characterInPositionSound();
        if (this.checkCharacterPosition()) this.characterDontInPositionSound();
        if (this.checkDead()) this.endBossDead();
    }

    checkEndBossPower() {
        return this.power > 0;
    }

    checkDead() {
        return this.power == 0;
    }

    endBossDead() {
        this.alert_sound.pause();
        this.walking_sound.pause();
        this.hurt_sound.pause();
        if (this.i < this.IMAGES_DEAD.length) {
            this.playAnimation(this.IMAGES_DEAD);
            this.i++;
        }else{
            this.loadImage(`img/4_enemie_boss_chicken/5_dead/G26.png`)
        }
    }

    checkCharacterPosition() {
        return this.world.character.x < 1900;
    }

    characterDontInPositionSound() {
        this.alert_sound.pause();
        this.walking_sound.pause();
        this.hurt_sound.pause();
    }

    checkCharacterInPosition() {
        return this.world.character.x > 1900 && this.power > 0;
    }

    characterInPositionSound() {
        this.alert_sound.play();
        this.walking_sound.pause();
        this.hurt_sound.pause();
    }

    endBossHurtCheck() {
        return this.endBossCollision() && this.power > 0;
    }

    endBossHurt() {
        this.walking_sound.pause();
        this.hurt_sound.play();
        this.playAnimation(this.IMAGES_HURT);
    }

    checkRunEndBoss() {
        return this.world.character.x > this.world.endboss.x - 500 && this.walktime > 0;
    }

    endBossRun() {
        setInterval(() => {
            if (this.walktime > 0) {
                this.walking_sound.play();
                this.alert_sound.pause();
                this.hurt_sound.pause();
                this.walktime -= 1;
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft(3);
            }
        }, 1000);
    }
}