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
    walking_sound = new Audio('./audio/chicken.mp3');
    constructor() {
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.loadImages(this.IMAGES_WALK);
        this.x = this.calcPosition(300, 3000);
        this.y = 360;
        this.height = 70;
        this.width = 70;
        this.animation();
    }

    animation() {
        setInterval(() => this.moving(), 1000 / 60);
        this.walking_sound.pause();
        setInterval(() => this.imageWalking(), 100 - this.speed * 2);
    }

    checkMoving(){
        return document.getElementById('landscape').style.display == 'none' && this.dead == 0;
    }

    moving(){
        if (this.checkMoving()) this.moveLeft(0.7); else this.moveLeft('none');
    }

    checkDead(){
        return this.dead == 1
    }

    imageWalking(){
        if (this.checkDead()) {
            this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        } else {
            this.playAnimation(this.IMAGES_WALK);
            this.walking_sound.play();
        }
    }
}