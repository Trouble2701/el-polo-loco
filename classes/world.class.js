class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkColliding();
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    checkColliding() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.pepeCollision(1);
                    this.chickenCollision(enemy);
                }else{
                    this.character.pepeCollision(0);
                }
            });
        }, 200);
    }

    chickenCollision(enemy) {
        if (!this.isDead()) {
            if (enemy.name == 'chicken') {
                this.character.setDownCalc(8);
            } else if (enemy.name == 'smallchicken') {
                this.character.setDownCalc(4);
            }
        }
    }

    isDead() {
        if (this.character.energy > 0) {
            return false;
        } else if (this.character.energy == 0) {
            this.character.pepeDead();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(function () {
            self.draw();
        });
        let self = this;
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}