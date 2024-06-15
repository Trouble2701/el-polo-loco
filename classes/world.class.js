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
    endbossBar = new EndbossBar();
    throw = [];
    splashBottle = [];
    gameOver = new GameOver();
    gameWON = new GameWON();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
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
            this.checkBoss();
            this.checkCoin();
            this.checkBottle();
            this.checkThrow();
            this.checkDead();
            this.checkEndboss();
            this.isEndbossDead()
        }, 200);
    }

    checkEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.dead == 0) {
                if (this.chickenKill(enemy)) {
                    enemy.dead = 1;
                    setTimeout(() => {
                        enemy.y = 1000;
                    }, 2000);
                } else {
                    this.character.pepeCollision(1);
                    this.chickenCollision(enemy);
                }
            } else {
                this.character.pepeCollision(0);
            }
        });
    }

    chickenKill(enemy) {
        let characterXP = this.character.x+this.character.offsetx;
        let characterYP = this.character.y+this.character.offsety;
        let characterWP = this.character.width - this.character.offsetw
        let characterHP = this.character.height - this.character.offsety;
        
        let characterX = characterXP + characterWP;
        let characterY = characterYP + characterHP;

        let enemyXP = enemy.x+enemy.offsetx;
        let enemyYP = enemy.y+enemy.offsety;
        let enemyWP = enemy.width - enemy.offsetw;
        let enemyHP = enemy.height-enemy.offseth;

        let enemyY =  enemyYP + enemyHP;
        let enemyX = enemyXP + enemyWP;

        
        return enemyXP < characterX && enemyX > characterXP && enemyY > characterY;
    }

    checkBoss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.pepeCollision(1);
            this.endbossCollision();
        } else {
            this.character.pepeCollision(0);
        }
    }

    checkCoin() {
        this.level.coin.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.character.pepeCoins += Math.round(100 / this.level.coin.length);
                this.itemAnimation(coins);
                this.coinBar.setCoins(this.character.pepeCoins);
            }
        });
    }

    checkBottle() {
        this.level.bottle.forEach((bottles) => {
            if (this.character.isColliding(bottles) && this.character.pepeBottle < 5) {
                this.character.pepeBottle += 1;
                let calcBottle = 100 / 5 * this.character.pepeBottle;
                this.itemAnimation(bottles);
                this.bottleBar.setbottles(calcBottle);
            }
        });
    }

    checkThrow() {
        if (this.keyboard.shoot && this.character.pepeBottle > 0) {
            let direction = 'no';
            if (this.character.otherDirection) {
                direction = 'yes';
            }
            this.throw.push(new ThrowAbleObject(this.character.x+this.character.offsetw, this.character.y+this.character.offseth, direction, this.character.pepeBottle));
            this.character.pepeBottle -= 1;
            let calcBottle = 100 / 5 * this.character.pepeBottle;
            this.bottleBar.setbottles(calcBottle);
            setInterval(() => {
                this.checkAttackBoss(direction);
            }, 20);
        }
    }

    checkAttackBoss(direction) {
        this.throw.forEach((throwAttack) => {
            if (this.endboss.isColliding(throwAttack) && this.endboss.hit != throwAttack.bottle) {
                this.endboss.hit = throwAttack.bottle;
                this.endboss.power -= 20;
                this.endbossBar.setPercentage(this.endboss.power);
                this.endboss.walktime = 0;
                this.endboss.endBossCollision();
                this.endboss.setDownCalc(0, 1);
                this.splashBottle.push(new SplahObject(throwAttack.x, throwAttack.y, direction));
                throwAttack.y = 1000;
                this.bottlesplash();
                return true;
            }
        });
    }

    bottlesplash() {
        this.splashBottle.forEach((splash) => {
            setInterval(() => {
                splash.y = 1000;
            }, 1000);
        });
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
                this.character.setDownCalc(8, 0);
            } else if (enemy.name == 'smallchicken') {
                this.character.setDownCalc(4, 0);
            }
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    endbossCollision() {
        if (!this.isDead()) {
            this.character.setDownCalc(25, 0);
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    isDead() {
        if (this.character.energy > 0) {
            return false;
        } else if (this.character.energy <= 0) {
            this.character.pepeDead();
            GameDead('pepe');
        }
    }

    endscreen() {
        if (checkpepeDead() == true) {
            return this.addToMap(this.gameOver);
        }
        if (checkendDead() == true) {
            return this.addToMap(this.gameWON);
        }
    }

    isEndbossDead() {
        if (this.endboss.power <= 0) {
            GameDead('endboss');
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
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.throw);
        this.addObjectsToMap(this.splashBottle);
        this.ctx.translate(-this.camera_x, 0);
        this.endscreen();
        requestAnimationFrame(function () {
            self.draw();
        });
        let self = this;
        this.initWindow();
    }

    setReset() {
        this.character.energy = 100;
        this.healthBar.percentage = 100;
        this.character.x = 0;
        this.character.y = 135;
        this.endboss.power = 100;
        this.endbossBar.percentage = 100;
        this.endboss.x = 2350;
        this.camera_x = 100;
        startSound.play();
        document.getElementById('newGame').style.display = 'flex';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        clearAllIntervals();
    }

    checkDead() {
        if (checkpepeDead() == true) {
            setTimeout(() => {
                this.setReset();
            }, 4000);
        }
    }

    checkEndboss() {
        if (checkendDead() == true) {
            setTimeout(() => {
                this.setReset();
            }, 4000);
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

    initWindow() {
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