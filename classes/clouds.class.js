class Clouds extends MoveableObject{
    height = 300;
    width = 300;
    constructor(cloud, y, x){
        super().loadImage(cloud);
        this.x = this.calcPosition(0, 3000);
        this.y = y;
        this.animation();
    }

    animation(){
        this.moveLeft(0.2);
    }
}