class SmallChicken extends MoveableObject{
    IMAGES_WALKING = [
        `img/3_enemies_chicken/chicken_small/1_walk/1_w.png`,
        `img/3_enemies_chicken/chicken_small/1_walk/2_w.png`,
        `img/3_enemies_chicken/chicken_small/1_walk/3_w.png`
    ];
    currentImage = 0;
    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_small/1_walk/1_w.png`);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 50 + Math.random() * 500;
        this.y = 390;
        this.height = 40;
        this.width = 40;
        this.animation();
    }

    animation(){
        this.moveLeft(0.2);
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.ImageCache[path];
            this.currentImage++;
        }, 200 - this.speed * 2);
    }
}