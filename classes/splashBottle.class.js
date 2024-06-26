/**
 * This class creates the splash animation when a bottle breaks
 */
class SplahObject extends MoveableObject {
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, direction) {
        super().loadImage(`img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png`);
        this.loadImages(this.IMAGES_SPLASH);
        this.y = y;
        this.height = 60;
        this.width = 40;
        this.checkDirection(x, direction);
        this.throw(direction);
    }

    /**
     * This function creates the flight animation of the drops
     * @param speedY - is the speed of the y curve
     * @param direction - is the direction in which the tropics move
     */
    throw(direction) {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.shootSide(direction);
            this.playAnimation(this.IMAGES_SPLASH);
        }, 25);
    }

    /**
     * this function checks the direction
     * @param {*} x - this is the position 
     * @param {*} direction - this is the direction 
     */
    checkDirection(x, direction) {
        if (direction == 'yes') {
            this.x = x - 100;
        } else {
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
        } else {
            return this.x += 5;
        }
    }
}