class Clouds extends MoveableObject{
    y = 10;
    height = 300;
    width = 300;
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 50 + Math.random() * 900;
        setInterval(() => {
            this.x = this.x-0.2;
        }, 100);
    }
}