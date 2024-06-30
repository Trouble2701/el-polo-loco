/**
 * This class creates the flying bottles
 */
class ThrowAbleObject extends MoveableObject {
    bottle;
    offsetx = 10;
    offsety = 10;
    offsetw = 15;
    offseth = 15;
    broke_sound = new Audio('./audio/bottlebroke.mp3');
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

    /**
     * This function creates the flight animation of the bottles
     * @param speedY - is the speed of the y curve
     * @param direction - is the direction in which the bottles move
     */
    throw(direction) {
        this.speedY = 20;
        this.applyGravity(1000/25);
        setInterval(() => {
            this.shootSide(direction);
            this.playAnimation(this.IMAGES);
        }, 25);
    }

    /**
     * this function checks the direction
     * @param {*} x - this is the position 
     * @param {*} direction - this is the direction 
     */
    checkDirection(x, direction){
        if(direction == 'yes'){
            this.x = x - 100;
        }else{
            this.x = x;
        }
    }

    /**
     * This function returns the direction of the shot
     * @param {*} direction - this is the direction 
     * @returns - return x + or -
     */
    shootSide(direction) {
        if (direction == 'yes') {
            return this.x -= 5;
        }else{
            return this.x += 5;
        }
    }
}