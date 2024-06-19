class SplahObject extends MoveableObject {
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, direction, boss) {
        super().loadImage(`img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png`);
        this.loadImages(this.IMAGES_SPLASH);
        this.y = y;
        this.height = 60;
        this.width = 40;
        this.checkDirection(x, direction);
        this.throw(direction, boss);
    }

    throw(direction, boss) {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.shootSide(direction);
            this.playAnimation(this.IMAGES_SPLASH);
        }, 25);
    }

    checkDirection(x, direction) {
        if (direction == 'yes') {
            this.x = x - 100;
        } else {
            this.x = x;
        }
    }

    shootSide(direction) {
        if (direction == 'yes') {
            return this.x -= 5;
        } else {
            return this.x += 5;
        }
    }
}