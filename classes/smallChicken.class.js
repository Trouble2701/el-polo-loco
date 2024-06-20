class SmallChicken extends MoveableObject {
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

    animation() {
        setInterval(() => this.moving(), 1000 / 60);
        smallChickenStop();
        setInterval(() => this.imageWalking(), 100 - this.speed * 2);
    }

    checkMoving(){
        return document.getElementById('landscape').style.display == 'none' && this.dead == 0;
    }

    moving(){
        if (this.checkMoving()) this.moveLeft(0.2); else this.moveLeft('none');
    }

    checkDead(){
        return this.dead == 1
    }

    imageWalking(){
        if (this.checkDead()) {
            this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        } else {
            this.playAnimation(this.IMAGES_WALK);
            if(sound == 0) smallChickenStart();
        }
    }
}