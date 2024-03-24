class Chicken extends MoveableObject{
    IMAGES_WALKING = [
        `img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`,
        `img/3_enemies_chicken/chicken_normal/1_walk/2_w.png`,
        `img/3_enemies_chicken/chicken_normal/1_walk/3_w.png`
    ];
    currentImage = 0;
    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 50 + Math.random() * 500;
        this.y = 360;
        this.height = 70;
        this.width = 70;
        this.animation();
    }

    animation(){
        this.moveLeft(0.7);
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.ImageCache[path];
            this.currentImage++;
        }, 100 - this.speed * 2);
    }
}