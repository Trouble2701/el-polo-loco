class MoveableObject{
    x=30;
    y=0;
    img;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveLeft(){
        
    }

    moveRight(){
        console.log('Moving Right');
    }
}