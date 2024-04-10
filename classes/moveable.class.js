class MoveableObject {
    x = 0;
    y = 135;
    height = 300;
    width = 100;
    speed = 0.15 + Math.random() * 0.25;
    img;
    ImageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    pepeColl = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 135;
    }
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
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

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    moveLeft(max) {
        let setmax = this.speed;
        if (max) {
            setmax = this.speed * max;
        }
        this.x -= setmax;
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