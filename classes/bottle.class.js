/**
 * This class distributes the bottles on the map
 */
class Bottle extends MoveableObject{
    /**
     * @param x - position of bottle
     * @param y - position of bottle
     * @param name - name of bottle
     * @param offset - offset reduces the dimensions of the images for the touches
     */
    x;
    y;
    name = 'bottle';
    offsetx = 10;
    offsety = 10;
    offsetw = 15;
    offseth = 15;
    save_sound = new Audio('./audio/bottleclick.mp3');

    constructor(){
        super().loadImage(`img/6_salsa_bottle/${this.calcPosition(1, 2)}_salsa_bottle_on_ground.png`);
        this.x = this.calcPosition(150, 1980);
        this.y = 380;
        this.height = 50;
        this.width = 50;
    }
}