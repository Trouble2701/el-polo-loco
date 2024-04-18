class Bottle extends MoveableObject{
    x;
    y;
    name = 'bottle';

    constructor(){
        super().loadImage(`img/6_salsa_bottle/${this.calcPosition(1, 2)}_salsa_bottle_on_ground.png`);
        this.x = this.calcPosition(150, 1980);
        this.y = 380;
        this.height = 50;
        this.width = 50;
    }
}