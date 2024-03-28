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
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    moveLeft(max) {
        setInterval(() => {
            this.x -= this.speed * max;
        }, 1000 / 60);
    }

    moveRight() {
        console.log('Moving Right');
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALK.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }
}