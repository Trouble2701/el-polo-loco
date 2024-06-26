/**
 * This class distributes the Clouds on the map
 */
class Clouds extends MoveableObject{
    height = 300;
    width = 300;
    constructor(cloud, y, x){
        super().loadImage(cloud);
        this.x = this.calcPosition(0, 3000);
        this.y = y;
        this.animation();
    }

    /**
     * This function starts the animations of the Clouds
     */
    animation(){
        this.moveLeft(0.2);
    }
}