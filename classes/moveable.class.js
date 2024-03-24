class MoveableObject{
    x=10;
    y=135;
    height = 300;
    width = 100;
    img;
    ImageCache = {};

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img; 
        });
    }

    moveLeft(){
        
    }

    moveRight(){
        console.log('Moving Right');
    }
}