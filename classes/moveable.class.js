class MoveableObject extends DrawableObject {
    speed = 0.15 + Math.random() * 0.25;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    pepeColl = 0;
    pepeCoins = 0;
    pepeBottle = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowAbleObject){
            return true;
        }else{
            return this.y < 135;
        }
    }

    isColliding(obj) {
        return this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height
    }

    setDownCalc(down) {
        this.energy -= down;
        if (this.energy < 0) {
            this.energy = 0;   
        }else{
            this.pepeColl = new Date().getTime();
        }
    }

    pepeDead() {
        if(this.energy == 0){
            return true;
        }
    }

    pepeCollision(){
        let timepassed = new Date().getTime() - this.pepeColl;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /*isColliding (obj) {
        return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
                (this.Y + this.offsetY + this.height) >= obj.Y &&
                (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
                obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }*/

    moveLeft(max) {
        let setmax = this.speed;
        if (max && max != 'none') {
            setmax = this.speed * max;
        }
        if(max != 'none'){
            this.x -= setmax;
        }
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }

    calcPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    jump(jumpHeight) {
        this.speedY = jumpHeight;
    }
}