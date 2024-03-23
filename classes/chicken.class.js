class Chicken extends MoveableObject{
    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.x = 50 + Math.random() * 500;
        this.y = 365;
        this.height = 70;
        this.width = 70;
        setInterval(() => {
            this.x = this.x-1;
        }, 100);
    }
}