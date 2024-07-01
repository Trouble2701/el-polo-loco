/**
 * This class distributes the bottles on the map
 */
class Bottle extends MoveableObject{
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