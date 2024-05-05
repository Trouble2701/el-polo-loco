class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    healthBar = new Healthbar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throw = [];
    gameOver = new GameOver();
    newGame;

    constructor(canvas, keyboard, newGame) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.newGame = newGame;
        this.draw();
        this.setWorld();
        this.checkColliding();
        this.bottleReplace();
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    checkColliding() {
        setInterval(() => {
            this.checkEnemy();
            this.checkCoin();
            this.checkBottle();
            this.checkThrow()
        }, 200);        
    }

    checkEnemy(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.pepeCollision(1);
                this.chickenCollision(enemy);
            } else {
                this.character.pepeCollision(0);
            }
        });
    }

    checkCoin(){
        this.level.coin.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.character.pepeCoins += Math.round(100 / this.level.coin.length);
                this.itemAnimation(coins);
                this.coinBar.setCoins(this.character.pepeCoins);
            }
        });
    }

    checkBottle(){
        this.level.bottle.forEach((bottles) => {
            if (this.character.isColliding(bottles) && this.character.pepeBottle < 5) {
                this.character.pepeBottle += 1;
                let calcBottle = 100 / 5 * this.character.pepeBottle;
                this.itemAnimation(bottles);
                this.bottleBar.setbottles(calcBottle);
            }
        });
    }

    checkThrow(){
        if(this.keyboard.shoot && this.character.pepeBottle > 0){
            let direction = 'no';
            if(this.character.otherDirection){
                direction = 'yes';
            }
            this.throw.push(new ThrowAbleObject(this.character.x + 100, this.character.y + 100, direction));
            this.character.pepeBottle -= 1;
            let calcBottle = 100 / 5 * this.character.pepeBottle;
            this.bottleBar.setbottles(calcBottle);
        }
    }

    bottleReplace() {
        setTimeout(() => {
            this.level.bottle.forEach((bottles) => {
                if (bottles.x > -1000 && bottles.y > -1000) {
                    bottles.x = this.calcPosition(150, this.level.level_end_x - 266);
                    bottles.y = 380;
                }
            });
        }, 3000);
    }

    calcPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    itemAnimation(item) {
        setInterval(() => {
            if (item.x > -2000 && item.y > -2000) {
                item.x -= +5;
                item.y -= +5;
            }
        }, 1000 / 60);
    }

    chickenCollision(enemy) {
        if (!this.isDead()) {
            if (enemy.name == 'chicken') {
                this.character.setDownCalc(8);
            } else if (enemy.name == 'smallchicken') {
                this.character.setDownCalc(4);
            }
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    isDead() {
        if (this.character.energy > 0) {
            return false;
        } else if (this.character.energy == 0) {
            this.character.pepeDead();
        }
    }

    startGame(stop) {
        if(stop == 'stop'){
            document.getElementById('newGame').style.display = 'flex';
        }else if(stop == 'run'){
            document.getElementById('newGame').style.display = 'none';
        }
    }

    startNewGame(){
        this.newGame.stop = 0;
        console.log('klick');
    }

    draw() {
        if (this.newGame.stop == 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.background);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.coin);
            this.addObjectsToMap(this.level.bottle);
            this.addObjectsToMap(this.throw)
            this.addToMap(this.character);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.healthBar);
            this.addToMap(this.coinBar);
            this.addToMap(this.bottleBar);
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.enemies);
            this.addToMap(this.endboss);
            this.ctx.translate(-this.camera_x, 0);
            if (this.checkDead()) {
                this.addToMap(this.gameOver);
            }
            this.startGame('run');
        } else {
            this.addToMap(this.newGame);
            this.startGame('stop');
        }
        requestAnimationFrame(function () {
            self.draw();
        });
        let self = this;
        this.init();
    }

    checkDead() {
        if (this.character.energy == 0) {
            setTimeout(() => {
                window.location.reload();
            }, 4000);
            return true;
        }
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

    init() {
        this.windowResize();
    }

    windowResize() {
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (width <= 1001) {
            if (height > width) {
                document.getElementById('landscape').style.display = 'flex';
            } else {
                this.resizeAction();
            }
        } else {
            document.getElementById('landscape').style.display = 'none';
        }
    }

    resizeAction() {
        window.scrollTo(0, 0);
        document.getElementById('landscape').style.display = 'none';
        document.getElementById('canvas').style.width = '100vw';
        document.getElementById('canvas').style.height = 'calc(100vh - 49px)';
        document.getElementById('button').style.width = '100vw';
    }
}