/**
 * This class creates the movements of the objects
 */
class MoveableObject extends DrawableObject {
    /**
     * @param speed - random speed of objects
     * @param otherDirection - object can move left or right
     * @param speedY - parameter for jumping
     * @param acceleration - parameter for end of jumping
     * @param energy - energy of character
     * @param pepeColl - colliding time of character
     * @param pepeCoins -  number of coins
     * @param pepeBottle - number of bottles
     * @param endBossColl - colliding time of endboss
     */
    speed = 0.15 + Math.random() * 0.25;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    pepeColl = 0;
    pepeCoins = 0;
    pepeBottle = 0;
    endBossColl = 0;

    /**
     * this function creates the jump from the character
     */
    applyGravity(jumpSpeed) {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, jumpSpeed);
    }

    /**
     * This function checks whether the character is on the ground
     * @returns - true 
     */
    isAboveGround() {
        if (this instanceof ThrowAbleObject) {
            return true;
        } else if (this instanceof SmallChicken) {
            return this.y < 390;
        } else {
            return this.y < 135;
        }
    }

    /**
     * This function checks the collision between the character and the object or opponent
     * @param {*} obj - This variable passes the object that you touch
     * @returns - return true by touch
     */
    isColliding(obj) {
        return (this.x + this.offsetx + this.width - this.offsetw) >= (obj.x + obj.offsetx)
            && (this.x + this.offsetx) <= (obj.x + obj.offsetx + obj.width - obj.offsetw)
            && (this.y + this.offsety + this.height - this.offseth) >= obj.y + obj.offsety
            && (this.y + this.offsety) <= (obj.y + obj.offsety + obj.height - obj.offseth)
    }

    /**
     * This function calculates the energy when touching an opponent
     * @param {*} down - This variable transfers the quantity that needs to be billed
     * @param {*} boss - This variable passes the value for the final boss (1) or the character (0)
     */
    setDownCalc(down, boss) {
        this.energy -= down;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            if (boss == 0) {
                this.pepeColl = new Date().getTime();
            } else if (boss == 1) {
                this.endBossColl = new Date().getTime();
            }
        }
    }

    /**
     * This function checks whether the character is dead
     * @returns - return true by 0
     */
    pepeDead() {
        if (this.energy == 0) {
            return true;
        }
    }

    /**
     * This function sets the collision time when touching an opponent
     * @returns return true 
     */
    pepeCollision() {
        let timepassed = new Date().getTime() - this.pepeColl;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * This function sets the collision time when touching a bottle
     * @returns return true 
     */
    endBossCollision() {
        let timepassed = new Date().getTime() - this.endBossColl;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * This function makes the character or opponent move to the left
     * @param {*} max - This variable transfers the speed of the movement
     */
    moveLeft(max) {
        let setmax = this.speed;
        if (max && max != 'none') {
            setmax = this.speed * max;
        }
        if (max != 'none') {
            this.x -= setmax;
        }
        if (max == 'stop') {
            setmax = 0;
        }
    }

    /**
     * This function makes the character move to the right
     */
    moveRight(max) {
        let setmax = this.speed;
        if (max && max != 'none') {
            setmax = this.speed * max;
        }
        if (max != 'none') {
            this.x += setmax;
        }
        if (max == 'stop') {
            setmax = 0;
        }
    }

    /**
     * This function plays the animations of the respective movement
     * @param {*} images - images for the animations
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }

    /**
     * This function calculates the random position where the opponents will be placed
     * @param {*} min - this variable passes the minimum value
     * @param {*} max - this variable passes the maximim value
     * @returns - return number
     */
    calcPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * This function starts the jump by changing the speedY variable
     * @param {*} jumpHeight - This variable transfers the height that will be jumped
     */
    jump(jumpHeight) {
        this.speedY = jumpHeight;
    }
}