class SmallChicken extends MoveableObject{
    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_small/1_walk/1_w.png`);
        this.x = 50 + Math.random() * 500;
        this.y = 390;
        this.height = 40;
        this.width = 40;
        setInterval(() => {
            this.x = this.x-0.6;
        }, 100);
    }
}