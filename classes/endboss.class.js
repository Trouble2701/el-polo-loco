class Endboss extends MoveableObject {
    hit;
    power = 100;
    i = 1;
    offsetx = 15;
    offsety = 90;
    offsetw = 30;
    offseth = 120;
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
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`,
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`,
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`,
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`,
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`,
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`
    ];
    world;
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
        endbossStop();
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

    checkMoving(){
        return document.getElementById('landscape').style.display == 'none' && this.power > 0 && keyShow == 0;
    }

    checkAttack() {
        return this.timeAttack == 150 && this.time <= 150 && this.walktime <= 0 && this.power > 0;
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
            endbossStop();
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
        setInterval(() => {
            return this.power <= 0;    
        }, 20);
    }

    endBossDead() {
        endbossStop();
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
        endbossStop();
    }

    checkCharacterInPosition() {
        return this.world.character.x > 1900 && this.power > 0;
    }

    characterInPositionSound() {
        if(sound == 0) endbossAlertStart();
        endbossHurtStop();
        endbossWalkingStop();
    }

    endBossHurtCheck() {
        return this.endBossCollision() && this.power > 0;
    }

    endBossHurt() {
        endbossAlertStop();
        endbossWalkingStop();
        if(sound == 0) endbossHurtStart();
        this.playAnimation(this.IMAGES_HURT);
    }

    checkRunEndBoss() {
        return this.world.character.x > this.world.endboss.x - 500 && this.walktime > 0 && this.power > 0;
    }

    endBossRun() {
        setInterval(() => {
            if (this.walktime > 0) {
                if(sound == 0) endbossWalkingStart();
                endbossAlertStop();
                endbossHurtStop();
                this.walktime -= 1;
                this.playAnimation(this.IMAGES_WALK);
                if (this.checkMoving()) this.moveLeft(3); else this.moveLeft('none');
            }
        }, 1000);
    }

    endbossReset(){
        this.power = 100;
        this.x = 2350;
    }
}