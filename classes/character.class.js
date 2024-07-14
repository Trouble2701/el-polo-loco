/**
 * This class positions the character on the map and controls various movements
 */
class Character extends MoveableObject {
    speed = 10.5;
    longIdle = 0;
    offsetx = 15;
    offsety = 120;
    offsetw = 40;
    offseth = 130;
    jumpIUp = 31;

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALK = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMP = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    world;
    setNewX = 100;
    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity(1000 / 25);
        this.animation();
    }

    /**
     * This function starts the animations of the character
     */
    animation() {
        setStopAbleInterval(this.checkNewPos, 10);
        setStopAbleInterval(this.walking, 1000 / 60);
        setStopAbleInterval(this.setIdle, 200);
        setStopAbleInterval(this.isLongIdle, 400);
        setStopAbleInterval(this.checkAll, 70);
        setStopAbleInterval(this.longIdleTime, 1000);
        setStopAbleInterval(this.lastJumpImage, 70);
    }

    /**
     * This function checks whether the character is in the rest phase
     */
    checkIdle() {
        return this.longIdle >= 6;
    }

    /**
     * This function checks all possible animations
     */
    checkAll() {
        if (world.character.pepeDead()) {
            world.character.imagePepeDead();
        } else if (world.character.pepeCollision() && !world.character.pepeDead()) {
            world.character.imagePepeHurt();
        } else if (world.character.isAboveGround()) {
            world.character.imagePepeJump();
        } else {
            if (world.character.checkImageWalk()) world.character.imagePepeWalk();
        }
    }

    /**
     * This function starts the animation for death
     */
    imagePepeDead() {
        pepeSleepStop();
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => setStopAbleInterval(this.deadAnimation, 50), 1000);
    }

    /**
     * this function is the Pepe Dead Animation
     * @returns
     */
    deadAnimation(){
        return world.character.y += 50
    }

    /**
     * This function counts up the time
     */
    longIdleTime() {
        if (world.character.longIdle < 6) world.character.longIdle += 1;
    }

    /**
     * This function starts the animation for hurt
     */
    imagePepeHurt() {
        pepeSleepStop();
        this.setLongIdle();
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * This function starts the animation for Jumping
     */
    imagePepeJump() {
        if (this.isAboveGround() && this.jumpIUp < 35 && this.lastY > this.y) {
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
            this.jumpIUp++;
        } else if (this.isAboveGround() && this.jumpIUp == 35 && this.lastY > this.y) {
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
        } else if (this.isAboveGround() && this.jumpIUp > 34 && this.jumpIUp < 37 && this.lastY < this.y) {
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
            this.jumpIUp++;
        } else if (this.isAboveGround() && this.jumpIUp == 37 && this.lastY > this.y) {
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
        }
    }

    /**
     * This function played last jumping animation
     */
    lastJumpImage() {
        if (!world.character.isAboveGround() && world.character.jumpIUp > 36 && world.character.jumpIUp < 39) {
            world.character.loadImage(`img/2_character_pepe/3_jump/J-${world.character.jumpIUp}.png`);
            world.character.jumpIUp++;
        } else if (world.character.jumpIUp == 39) {
            world.character.jumpIUp = 31;
        }
    }

    /**
     * This function starts the animation for walking
     */
    imagePepeWalk() {
        this.playAnimation(this.IMAGES_WALK);
    }

    /**
     * This function checks whether a key is pressed and the character is still alive
     */
    checkImageWalk() {
        return this.world.keyboard.right || this.world.keyboard.left && !this.pepeDead();
    }

    /**
     * this function sets the character to idle
     */
    setIdle() {
        if (world.character.checkWalking()) world.character.dontWalk();
    }

    /**
     * this function sets the character Long idle of 0 
     */
    setLongIdle() {
        this.longIdle = 0;
    }

    /**
     * This function starts the animation for sleeping
     */
    isLongIdle() {
        pepeSleepStop();
        if (world.character.checkIdle()) {
            world.character.playAnimation(world.character.IMAGES_LONG_IDLE);
            if (sound == 0) pepeSleepStart();
        }
    }

    /**
     * This function checks whether a key is pressed or the character is in long_idle or still alive
     */
    checkWalking() {
        return !this.world.keyboard.right && !this.world.keyboard.left && !this.checkIdle() && !this.pepeDead();
    }

    /**
     * This function starts the animation for Idle
     */
    dontWalk() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * this function starts the movements
     */
    walking() {
        pepeWalkStop();
        if (world.character.canWalkRight()) world.character.walkRight();
        if (world.character.canWalkLeft()) world.character.walkLeft();
        if (world.character.canJump()) world.character.jumping();
        world.character.world.camera_x = -world.character.x + world.character.setNewX;
        world.character.checkYPos();
    }

    /**
     * This function checks the new x position of the character
     */
    checkNewPos() {
        if (world.character.checkEndBossPos()) world.character.setNewPosition('new');
        if (!world.character.checkEndBossPos()) world.character.setNewPosition('old');
    }

    /**
     * This function checks the current x position of the endboss
     */
    checkEndBossPos() {
        return this.world.endboss.x < this.x;
    }

    /**
     * This function sets the new position of the character
     * @param {*} pos - passes new or old
     */
    setNewPosition(pos) {
        if (this.newXPos(pos)) this.setNewXPos(pos);
        if (this.oldXPos(pos)) this.newOldXPos(pos);
    }

    /**
     * This function sets the new position and always adds 2 pixels to setNewX until 400 is reached
     * @param {*} pos - passes new or old 
     */
    setNewXPos(pos) {
        if (this.newXPos(pos)) this.setNewX += 2; else this.setNewX = 400;
    }

    /**
     * This function sets the new position and always calculates 2 pixels from setNewX until 100 is reached
     * @param {*} pos - passes new or old 
     */
    newOldXPos(pos) {
        if (this.oldXPos(pos)) this.setNewX -= 2; else this.setNewX = 100;
    }

    /**
     * This function checks the value of setNewX whether it is at 400 and whether pos is new
     * @param {*} pos - passes new or old 
     */
    newXPos(pos) {
        return this.setNewX <= 400 && pos == 'new';
    }

    /**
     * This function checks the value of setNewX whether it is 100 and whether pos is old
     * @param {*} pos - passes new or old 
     */
    oldXPos(pos) {
        return this.setNewX >= 100 && pos == 'old'
    }

    /**
     * This function checks the height position and sets the character to 135px when it comes into contact with the ground, but only if it is still alive
     */
    checkYPos() {
        if (!this.isAboveGround() && !this.pepeDead()) this.y = 135;
    }

    /**
     * This function checks whether the jump button has been pressed and the character is on the ground, if so it returns true, but only if the character is still alive
     */
    canJump() {
        return this.world.keyboard.space && !this.isAboveGround() && !this.pepeDead();
    }

    /**
     * This function starts the jump
     */
    jumping() {
        this.setLongIdle();
        pepeWalkStop();
        if (sound == 0) pepeJumpStart();
        super.jump('23');
    }

    /**
     * This function starts the jump when kill a chicken
     */
    smalJump() {
        this.jumpIUp = 31;
        super.jump('15');
    }

    /**
     * This function checks the right walking
     */
    canWalkRight() {
        return this.world.keyboard.right && this.x < this.world.level.level_end_x && !this.pepeDead();
    }

    /**
     * This function start the right walking
     */
    walkRight() {
        this.setLongIdle();
        this.otherDirection = false;
        this.moveRight();
        if (this.dontJump()) if (sound == 0) pepeWalkStart();
    }

    /**
     * This function checks the left walking
     */
    canWalkLeft() {
        return this.world.keyboard.left && this.x > 0 && !this.pepeDead();
    }

    /**
     * This function start the left walking
     */
    walkLeft() {
        this.setLongIdle();
        this.otherDirection = true;
        this.moveLeft();
        if (this.dontJump()) if (sound == 0) pepeWalkStart();
    }

    /**
     * This function checks the jumping
     */
    dontJump() {
        return !this.world.keyboard.space && !this.isAboveGround();
    }

    /**
     * This function resets the character's parameters when you restart the game
     */
    characterReset() {
        this.energy = 100;
        this.x = 0;
        this.y = 135;
    }

    /**
     * This function animates the coins and bottles when they are collected
     * @param {*} item - coin oder bottle
     */
    itemAnimation(item) {
        setInterval(() => {
            if (item.x > -2000 && item.y > -2000) item.x -= +5; item.y -= +5;
        }, 1000 / 60);
    }

    /**
     * This function puts new bottles into the world again and stops the longIdle
     */
    throwAction() {
        if (this.pepeBottle == 1) this.world.bottleBar.bottleReplace();
        this.longIdle = 0;
    }
}