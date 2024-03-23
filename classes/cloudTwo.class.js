class CloudsTwo extends MoveableObject{
    y = 15;
    height = 100;
    width = 250;
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/2.png');
        this.x = 0 + Math.random() * 200;
        setInterval(() => {
            this.x = this.x-0.4;
        }, 100);
    }
}