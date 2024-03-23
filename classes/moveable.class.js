class MoveableObject{
    x=10;
    y=90;
    height = 350;
    width = 130;
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