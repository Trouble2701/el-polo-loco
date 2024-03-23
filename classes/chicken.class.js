class Chicken extends MoveableObject{
    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.x = 50 + Math.random() * 500;
        this.y = 105;
        this.height = 40;
        this.width = 20;
        setInterval(() => {
            this.x = this.x-1;
        }, 100);
    }
}