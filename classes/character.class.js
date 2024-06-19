class Character extends MoveableObject {
    speed = 10.5;
    longIdle = false;
    offsetx = 15;
    offsety = 120;
    offsetw = 40;
    offseth = 130;

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
    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animation();
    }

    animation() {
        //Junus hat dies eingebaut um nach dem Ende alles stoppen zu können, funktioniert bei mir nicht, denn da kommt der nächste fehler. zufinden js/stopGame.js
        //setStopAbleInterval(this.walking, 1000 / 60);
        setInterval(() => this.walking(), 1000 / 60);
        setInterval(() => this.setIdle(), 200);
        setInterval(() => this.isLongIdle(), 400);
        setInterval(() => this.checkAll(), 70);
    }

    checkIdle() {
        return !this.world.keyboard.right && !this.world.keyboard.left && this.longIdle && !this.pepeDead();
    }

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

    imagePepeDead() {
        pepeSleepStop();
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => setInterval(() => this.y += 50, 50), 1000);
    }

    imagePepeHurt() {
        pepeSleepStop();
        this.setLongIdle();
        this.playAnimation(this.IMAGES_HURT);
    }

    imagePepeJump() {
        this.playAnimation(this.IMAGES_JUMP);
    }

    imagePepeWalk() {
        this.playAnimation(this.IMAGES_WALK);
    }

    checkImageWalk() {
        return this.world.keyboard.right || this.world.keyboard.left && !this.pepeDead();
    }

    setIdle() {
        if (this.checkWalking()) this.dontWalk();
    }

    setLongIdle() {
        this.longIdle = false;
    }

    isLongIdle() {
        pepeSleepStop();
        if (this.checkIdle()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            pepeSleepStart();
        }
    }

    checkWalking() {
        return !this.world.keyboard.right && !this.world.keyboard.left && !this.longIdle && !this.pepeDead();
    }

    dontWalk() {
        this.playAnimation(this.IMAGES_IDLE);
        setTimeout(() => this.longIdle = true, 6000);
    }

    walking() {
        pepeWalkStop();
        if (this.canWalkRight()) this.walkRight();
        if (this.canWalkLeft()) this.walkLeft();
        if (this.canJump()) this.jumping();
        this.world.camera_x = -this.x + 100;
        this.checkYPos();
    }

    checkYPos(){
        if(!this.isAboveGround() && !this.pepeDead()){
            this.y = 135;
        }
    }

    canJump() {
        return this.world.keyboard.space && !this.isAboveGround() && !this.pepeDead();
    }

    jumping() {
        this.setLongIdle();
        pepeWalkStop();
        pepeJumpStart();
        super.jump('23');
    }

    canWalkRight() {
        return this.world.keyboard.right && this.x < this.world.level.level_end_x && !this.pepeDead();
    }

    walkRight() {
        this.setLongIdle();
        this.otherDirection = false;
        this.moveRight();
        if (this.dontJump()) pepeWalkStart();
    }

    canWalkLeft() {
        return this.world.keyboard.left && this.x > 0 && !this.pepeDead();
    }

    walkLeft() {
        this.setLongIdle();
        this.otherDirection = true;
        this.moveLeft();
        if (this.dontJump()) pepeWalkStart();
    }

    dontJump() {
        return !this.world.keyboard.space && !this.isAboveGround();
    }
}