class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ];
    clouds = [
        new Clouds(),
        new CloudsTwo(),
    ]
    background = [
        new BackgroundThird(),
        new BackgroundSecond(),
        new Background(),
    ]
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });
        this.background.forEach(back => {
            this.ctx.drawImage(back.img, back.x, back.y, back.width, back.height);
        });
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        requestAnimationFrame(function (){
            self.draw();
        });
        let self = this;       
    }
}