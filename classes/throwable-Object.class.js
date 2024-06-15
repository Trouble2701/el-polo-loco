class ThrowAbleObject extends MoveableObject {
    bottle;
    offsetx = 10;
    offsety = 10;
    offsetw = 15;
    offseth = 15;
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y, direction, bottle) {
        super().loadImage(`img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png`);
        this.loadImages(this.IMAGES);
        this.y = y;
        this.height = 60;
        this.width = 40;
        this.checkDirection(x, direction);
        this.throw(direction);
        this.bottle = bottle;
    }

    throw(direction) {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.shootSide(direction);
            this.playAnimation(this.IMAGES);
        }, 25);
    }

    checkDirection(x, direction){
        if(direction == 'yes'){
            this.x = x - 100;
        }else{
            this.x = x;
        }
    }

    shootSide(direction) {
        if (direction == 'yes') {
            return this.x -= 5;
        }else{
            return this.x += 5;
        }
    }
}