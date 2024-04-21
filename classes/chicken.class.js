class Chicken extends MoveableObject{
    name = 'chicken';
    IMAGES_WALK = [
        `img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`,
        `img/3_enemies_chicken/chicken_normal/1_walk/2_w.png`,
        `img/3_enemies_chicken/chicken_normal/1_walk/3_w.png`
    ];
    walking_sound = new Audio('./audio/chicken.mp3');
    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.loadImages(this.IMAGES_WALK);
        this.x = this.calcPosition(300, 3000);
        this.y = 360;
        this.height = 70;
        this.width = 70;
        this.animation();
    }

    animation(){
        setInterval(() => {
            if(document.getElementById('landscape').style.display == 'none'){
                this.moveLeft(0.7);
            }else{
                this.moveLeft('none');
            }
        }, 1000 / 60);
        this.walking_sound.pause();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
            this.walking_sound.play();
        }, 100 - this.speed * 2);
    }
}