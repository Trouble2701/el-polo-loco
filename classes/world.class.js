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
        new Clouds('img/5_background/layers/4_clouds/1.png', 10),
        new Clouds('img/5_background/layers/4_clouds/2.png', 35),
    ]
    background = [
        new Background(`img/5_background/layers/air.png`, 0),
        new Background(`img/5_background/layers/3_third_layer/1.png`, 0),
        new Background(`img/5_background/layers/2_second_layer/1.png`, 0),
        new Background(`img/5_background/layers/1_first_layer/1.png`, 0)
    ]
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }
    
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        requestAnimationFrame(function (){
            self.draw();
        });
        let self = this;       
    }

    addObjectsToMap(object){
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection){
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}