class Endboss extends MoveableObject {
    hit;
    power = 100;
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
        `img/4_enemie_boss_chicken/5_dead/G24.png`,
        `img/4_enemie_boss_chicken/5_dead/G25.png`,
        `img/4_enemie_boss_chicken/5_dead/G26.png`
    ];
    world;
    walking_sound = new Audio('./audio/chicken_boss.mp3');
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
        this.hurt_sound.pause();
        setInterval(() => {
            if (this.endBossCollision() && this.power > 0) {
                this.walking_sound.pause();
                this.hurt_sound.play();
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.world.character.x > this.world.endboss.x-500 && this.walktime > 0) {
                this.endBossRun();
            } else if (this.timeAttack == 150 && this.time <= 150 && this.walktime <= 0) {
                this.time += 1;
                if (this.power > 0) {
                    this.playAnimation(this.IMAGES_ALERT);
                }
                if (this.world.character.x > 1900 && this.power > 0) {
                    this.walking_sound.play();
                    this.hurt_sound.pause();
                }
                if (this.world.character.x < 1900) {
                    this.walking_sound.pause();
                    this.hurt_sound.pause();
                }
                if (this.power == 0) {
                    this.walking_sound.pause();
                    this.hurt_sound.pause();
                    this.playAnimation(this.IMAGES_DEAD);
                }
            } else {
                if (this.timeAttack != 0) {
                    this.timeAttack -= 5;
                    if (this.world.character.x > 1900 && this.power > 0) {
                        this.walking_sound.pause();
                        this.hurt_sound.pause();
                        this.playAnimation(this.IMAGES_ATTACK);
                    }
                } else {
                    if (this.timeAttack <= 0) {
                        this.timeAttack = 150;
                        this.time = 0;
                        this.walktime = 100;
                    }
                }
            }
        }, 100);
    }

    endBossRun() {
        setInterval(() => {
            if(this.walktime > 0){
                this.walking_sound.pause();
                this.hurt_sound.pause();
                this.walktime -= 1;
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft(3);
            }
        }, 1000);
    }
}