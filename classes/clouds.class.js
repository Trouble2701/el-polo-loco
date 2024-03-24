class Clouds extends MoveableObject{
    height = 300;
    width = 300;
    constructor(cloud, y){
        super().loadImage(cloud);
        this.x = Math.random() * 500;
        this.y = y;
        this.animation();
    }

    animation(){
        this.moveLeft(0.2);
    }
}