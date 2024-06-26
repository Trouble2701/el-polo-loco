/**
 * This class positions the smallchickens on the map and controls various movements
 */
class SmallChicken extends MoveableObject {
    /**
     * @param name - parameter for name
     * @param dead - parameter for smallchicken dead
     * @param offset - offset reduces the dimensions of the images for the touches
     */
    name = 'smallchicken';
    dead = 0;
    offsetx = 5;
    offsety = 5;
    offsetw = 10;
    offseth = 10;
    IMAGES_WALK = [
        `img/3_enemies_chicken/chicken_small/1_walk/1_w.png`,
        `img/3_enemies_chicken/chicken_small/1_walk/2_w.png`,
        `img/3_enemies_chicken/chicken_small/1_walk/3_w.png`
    ];
    
    constructor() {
        super().loadImage(`img/3_enemies_chicken/chicken_small/1_walk/1_w.png`);
        this.loadImages(this.IMAGES_WALK);
        this.x = this.calcPosition(300, 3000);
        this.y = 390;
        this.height = 40;
        this.width = 40;
        this.animation();
    }

    /**
     * This function starts the animations of the smallchicken
     */
    animation() {
        setInterval(() => this.moving(), 1000 / 60);
        smallChickenStop();
        setInterval(() => this.imageWalking(), 100 - this.speed * 2);
    }

    /**
     * This function checks the parameters of the smallchicken's running
     */
    checkMoving(){
        return document.getElementById('landscape').style.display == 'none' && this.dead == 0 && keyShow == 0;
    }

    /**
     * This function starts the smallchicken running
     */
    moving(){
        if (this.checkMoving()) this.moveLeft(0.2); else this.moveLeft('none');
    }

    /**
     * This function checks the parameter of the smallchicken's dead
     */
    checkDead(){
        return this.dead == 1
    }

    /**
     * This function starts the animation for walking or for Dead
     */
    imageWalking(){
        if (this.checkDead()) {
            this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        } else {
            this.playAnimation(this.IMAGES_WALK);
            if(sound == 0) smallChickenStart();
        }
    }
}