class SmallChicken extends MoveableObject{
    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_small/1_walk/1_w.png`);
        this.x = 50 + Math.random() * 500;
        this.y = 125;
        this.height = 20;
        this.width = 15;
        setInterval(() => {
            this.x = this.x-1;
        }, 100);
    }
}