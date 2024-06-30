/**
 * This class positions the character on the map and controls various movements
 */
class Character extends MoveableObject {
    /**
     * @param speed - parameter for jump
     * @param long_idle - parameter for sleeping, 6 is sleeping
     * @param offset - offset reduces the dimensions of the images for the touches
     */
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
    /**
    * @param world - give this class in the world.class.js back
    * @param setNewX - This value is calculated on the x position of the character
    */
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
        setInterval(() => this.checkNewPos(), 10);
        setInterval(() => this.walking(), 1000 / 60);
        setInterval(() => this.setIdle(), 200);
        setInterval(() => this.isLongIdle(), 400);
        setInterval(() => this.checkAll(), 70);
        setInterval(() => this.longIdleTime(), 1000);
        setInterval(() => {
            this.lastJumpImage();
        }, 70);
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
        if (this.pepeDead()) {
            this.imagePepeDead();
        } else if (this.pepeCollision() && !this.pepeDead()) {
            this.imagePepeHurt();
        } else if (this.isAboveGround()) {
            this.imagePepeJump();
        } else {
            if (this.checkImageWalk()) this.imagePepeWalk();
        }
    }

    /**
     * This function starts the animation for death
     */
    imagePepeDead() {
        pepeSleepStop();
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => setInterval(() => this.y += 50, 50), 1000);
    }

    longIdleTime() {
        if (this.longIdle < 6) this.longIdle += 1;
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
        if(this.isAboveGround() && this.jumpIUp < 35 && this.lastY > this.y){
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
            this.jumpIUp++;
        }else if(this.isAboveGround() && this.jumpIUp == 35 && this.lastY > this.y){
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
        }else if(this.isAboveGround() && this.jumpIUp > 34 && this.jumpIUp < 37 && this.lastY < this.y){
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
            this.jumpIUp++;
        } else if(this.isAboveGround() && this.jumpIUp == 37 && this.lastY > this.y){
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
        }
    }

    /**
     * This function played last jumping animation
     */
    lastJumpImage(){
        if(!this.isAboveGround() && this.jumpIUp > 36 && this.jumpIUp < 39){
            this.loadImage(`img/2_character_pepe/3_jump/J-${this.jumpIUp}.png`);
            this.jumpIUp++;   
        }else if(this.jumpIUp == 39){
            this.jumpIUp = 31;
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
        if (this.checkWalking()) this.dontWalk();
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
        if (this.checkIdle()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
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
        if (this.canWalkRight()) this.walkRight();
        if (this.canWalkLeft()) this.walkLeft();
        if (this.canJump()) this.jumping();
        this.world.camera_x = -this.x + this.setNewX;
        this.checkYPos();
    }

    /**
     * This function checks the new x position of the character
     */
    checkNewPos() {
        if (this.checkEndBossPos()) this.setNewPosition('new');
        if (!this.checkEndBossPos()) this.setNewPosition('old');
    }

    /**
     * This function checks the current x position of the endboss
     * @returns - true
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
     * @returns - true
     */
    newXPos(pos) {
        return this.setNewX <= 400 && pos == 'new';
    }

    /**
     * This function checks the value of setNewX whether it is 100 and whether pos is old
     * @param {*} pos - passes new or old 
     * @returns - true
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
}