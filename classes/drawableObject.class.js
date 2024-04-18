class DrawableObject {
    img;
    ImageCache = {};
    currentImage = 0;
    x = 0;
    y = 135;
    height = 300;
    width = 100;


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

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    resolveImageIndex(setImages){
        if(setImages >= 100){
            return 5;
        }else if(setImages > 80){
            return 4;
        }else if(setImages > 60){
            return 3;
        }else if(setImages > 40){
            return 2;
        }else if(setImages > 20){
            return 1;
        }else{
            return 0;
        }
    }
}