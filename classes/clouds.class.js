class Clouds extends MoveableObject{
    height = 300;
    width = 300;
    speed;
    constructor(cloud, y){
        super().loadImage(cloud);
        this.x = Math.random() * 500;
        this.speed = Math.random(0.1, 0.2);
        this.y = y;
        this.animation();
    }

    animation(){
        setInterval(() => {
            this.x -= this.speed * 0.2;
        }, 1000 / 60);
    }
}