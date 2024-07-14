/**
 * This class creates the splash animation when a bottle breaks
 */
class SplahObject extends MoveableObject {
    bottle;
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, direction, bottle) {
        super().loadImage(`img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png`);
        this.loadImages(this.IMAGES_SPLASH);
        this.y = y;
        this.height = 60;
        this.width = 40;
        this.bottle = bottle;
        this.checkDirectioSplash(x, direction);
        this.throw(direction);
    }
    
    setYFall = 0;

    /**
     * This function creates the flight animation of the drops
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
    checkDirectioSplash(x, direction) {
        if (direction == 'yes') {
            this.x = x;
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
        setInterval(() => this.setYFall += 1, 100);
        if (direction == 'yes') {
            return this.x -= 5, this.y += 5+this.setYFall;
        } else {
            return this.x += 5, this.y += 5+this.setYFall;
        }
    }
}