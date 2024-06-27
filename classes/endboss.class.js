/**
 * This class positions the Endboss on the map and controls various movements
 */
class Endboss extends MoveableObject {
    /**
     * @param hit - hit by bottles
     * @param power - energy of Endboss
     * @param i - number of current dead image length
     * @param offset - offset reduces the dimensions of the images for the touches
     */
    hit;
    power = 100;
    i = 1;
    offsetx = 115;
    offsety = 140;
    offsetw = 200;
    offseth = 170;
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
    /**
    * @param world - give this class in the world.class.js back
    */
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

    /**
     * @param time - time of stand
     * @param walktime - Time of walking
     * @param timeAttack - time of attack
     */
    time = 0;
    walktime = 100;
    timeAttack = 150;

    /**
     * This function start the animations of endboss
     */
    animation() {
        endbossStop();
        setInterval(() => this.bossAnimation(), 100);
    }

    /**
     * this function animated all animations of endboss
     */
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

    /**
     * This function checks the parameters of the endboss running
     */
    checkMoving(){
        return document.getElementById('landscape').style.display == 'none' && this.power > 0 && keyShow == 0;
    }

    /**
     * This function checks the parameters of the endboss attack
     */
    checkAttack() {
        return this.timeAttack == 150 && this.time <= 150 && this.walktime <= 0 && this.power > 0;
    }

    /**
     * This function animated the attack or stop the attack
     */
    attack() {
        if (this.canAttack()) {
            this.startAttack();
        } else {
            if (this.canDontAttack()) this.stopAttack();
        }
    }

    /**
     * This function checks whether an attack can be made
     * @returns - return true
     */
    canAttack() {
        return this.timeAttack != 0;
    }

    /**
     * This function checks whether an attack cannot be made
     * @returns - return true
     */
    canDontAttack() {
        return this.timeAttack <= 0;
    }

    /**
     * this function starts the attack
     */
    startAttack() {
        this.timeAttack -= 5;
        if (this.world.character.x > 1900 && this.power > 0) {
            endbossStop();
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
     * This function stops the attack and sets standards parameters
     */
    stopAttack() {
        this.timeAttack = 150;
        this.time = 0;
        this.walktime = 100;
    }

    /**
     * This function plays the alarm animation when the character is in the right position
     */
    dontAttack() {
        this.time += 1;
        if (this.checkEndBossPower()) this.playAnimation(this.IMAGES_ALERT);
        if (this.checkCharacterInPosition()) this.characterInPositionSound();
        if (this.checkCharacterPosition()) this.characterDontInPositionSound();
        if (this.checkDead()) this.endBossDead();
    }

    /**
     * This function checks the energy of endboss
     * @returns return true if more than 0
     */
    checkEndBossPower() {
        return this.power > 0;
    }

    /**
     * This function checks dead of endboss
     * @returns return true if less than 0
     */
    checkDead() {
        setInterval(() => {
            return this.power <= 0;    
        }, 20);
    }

    /**
     * this function play the dead animation
     */
    endBossDead() {
        endbossStop();
        if (this.i < this.IMAGES_DEAD.length) {
            this.playAnimation(this.IMAGES_DEAD);
            this.i++;
        }else{
            this.loadImage(`img/4_enemie_boss_chicken/5_dead/G26.png`)
        }
    }

    /**
     * this function checks the position of character than less 1900px
     * @returns - return true 
     */
    checkCharacterPosition() {
        return this.world.character.x < 1900;
    }

    /**
     * this function stop sound of endboss not in position
     */
    characterDontInPositionSound() {
        endbossStop();
    }

    /**
     * this function check the position of character than more 1900px
     */
    checkCharacterInPosition() {
        return this.world.character.x > 1900 && this.power > 0;
    }

    /**
     * this function start sound when character in position
     */
    characterInPositionSound() {
        if(sound == 0) endbossAlertStart();
        endbossHurtStop();
        endbossWalkingStop();
    }

    /**
     * this function check hurt
     * @returns - return true when hit by bottle and power more than 0
     */
    endBossHurtCheck() {
        return this.endBossCollision() && this.power > 0;
    }

    /**
     * this function play hurt animation 
     */
    endBossHurt() {
        endbossAlertStop();
        endbossWalkingStop();
        if(sound == 0) endbossHurtStart();
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * this function check run of endboss
     * @returns - return true 
     */
    checkRunEndBoss() {
        return this.world.character.x > this.world.endboss.x - 500 && this.walktime > 0 && this.power > 0;
    }

    /**
     * this function play walking animation 
     */
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

    /**
     * This function checks whether the game is over when the Endboss is dead, if correct, true is returned
     * @returns - true
     */
    isEndbossDead() {
        if (this.power <= 0) {
            this.endBossDead();
            GameDead('endboss');
        }
    }

    /**
     * This function resets the endboss parameters when you restart the game
     */
    endbossReset(){
        this.power = 100;
        this.x = 2350;
    }
}