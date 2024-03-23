class Clouds extends MoveableObject{
    y = 0;
    height = 100;
    width = 250;
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 50 + Math.random() * 100;
        setInterval(() => {
            this.x = this.x-0.2;
        }, 100);
    }
}