/**
 * This class positions the chickens on the map and controls various movements
 */
class Chicken extends MoveableObject {
    name = 'chicken';
    dead = 0;
    offsetx = 5;
    offsety = 5;
    offsetw = 10;
    offseth = 10;
    IMAGES_WALK = [
        `img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`,
        `img/3_enemies_chicken/chicken_normal/1_walk/2_w.png`,
        `img/3_enemies_chicken/chicken_normal/1_walk/3_w.png`
    ];
    
    constructor() {
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.loadImages(this.IMAGES_WALK);
        this.x = this.calcPosition(300, 3000);
        this.y = 360;
        this.height = 70;
        this.width = 70;
        this.animation();
    }

    direction = false;

    /**
     * This function starts the animations of the chicken
     */
    animation() {
        setInterval(() => this.checkDirection(), 1000/60);
        setInterval(() => this.walkSide(), 100);
        setInterval(() => this.moving(), 1000 / 60);
        chickenStop();
        setInterval(() => this.imageWalking(), 100 - this.speed * 2);
    }

    /**
     * this function check the endboss direction
     */
    checkDirection(){
        if(this.direction && !this.otherDirection){
            this.otherDirection = true;
        }else if(!this.direction && this.otherDirection){
            this.otherDirection = false;
        }
    }

    /**
     * This function checks the parameters of the chicken's running
     */
    checkMoving(){
        return document.getElementById('landscape').style.display == 'none' && this.dead == 0 && keyShow == 0;
    }

    /**
     * This function starts the chicken running
     */
    moving(){
        if (this.checkMoving() && !this.otherDirection) this.moveLeft(1); else this.moveLeft('none');
        if (this.checkMoving() && this.otherDirection) this.moveRight(1); else this.moveRight('none');
    }

    /**
     * this function set the endboss direction
     */
    walkSide(){
        if(this.x < -100 && !this.direction){
            this.direction = true;
        }else if(this.x > 2400 && this.direction){
            this.direction = false;
        }
    }

    /**
     * This function checks the parameter of the chicken's dead
     */
    checkDead(){
        return this.dead == 1
    }

    /**
     * This function starts the animation for walking or for Dead
     */
    imageWalking(){
        if (this.checkDead()) {
            this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        } else {
            this.playAnimation(this.IMAGES_WALK);
            if(sound == 0) chickenStart();
        }
    }
}