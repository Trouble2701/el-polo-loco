class CloudsTwo extends MoveableObject{
    y = 35;
    height = 300;
    width = 300;
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/2.png');
        this.x = 0 + Math.random() * 900;
        setInterval(() => {
            this.x = this.x-0.4;
        }, 100);
    }
}