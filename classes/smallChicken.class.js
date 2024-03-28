class SmallChicken extends MoveableObject{
    IMAGES_WALK = [
        `img/3_enemies_chicken/chicken_small/1_walk/1_w.png`,
        `img/3_enemies_chicken/chicken_small/1_walk/2_w.png`,
        `img/3_enemies_chicken/chicken_small/1_walk/3_w.png`
    ];
    walking_sound = new Audio('./audio/small_chicken.mp3');
    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_small/1_walk/1_w.png`);
        this.loadImages(this.IMAGES_WALK);
        this.x = 50 + Math.random() * 500;
        this.y = 390;
        this.height = 40;
        this.width = 40;
        this.animation();
    }

    animation(){
        this.moveLeft(0.2);
        this.walking_sound.pause();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
            this.walking_sound.play();
        }, 200 - this.speed * 2);
    }
}