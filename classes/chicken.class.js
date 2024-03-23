class Chicken extends MoveableObject{
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 50 + Math.random() * 500;
        this.y = 100;
        this.height = 50;
        this.width = 30;
    }
    
}