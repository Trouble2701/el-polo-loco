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
        this.checkActions();
        this.checkAllDeads();
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    checkActions(){
        setInterval(() => {
            this.checkThrow();
        }, 200);
    }

    checkAllDeads(){
        setInterval(() => {
            this.isEndbossDead();
            this.checkDead();
        }, 100);
    }

    checkColliding() {
        setInterval(() => {
            this.checkEnemy();
            this.checkBoss();
            this.checkCoin();
            this.checkBottle();
            this.checkEndboss();
        }, 50);
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
        return this.character.isColliding(enemy) && this.character.isAboveGround();
    }

    checkCharackterStartPos(characterX, enemyXS, enemyX) {
        return characterX > enemyX && characterX < enemyXS && this.character.isAboveGround();
    }

    checkCharackterEndPos(characterXS, enemyXS, enemyX) {
        return characterXS > enemyX && characterXS < enemyXS && this.character.isAboveGround();
    }

    checkBoss() {
        if (this.character.isColliding(this.endboss) && this.endboss.power > 0) {
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
                if(sound == 0) coins.save_sound.play();
                this.itemAnimation(coins);
                this.coinBar.setCoins(this.character.pepeCoins);
            }
        });
    }

    checkBottle() {
        this.level.bottle.forEach((bottles) => {
            if (this.character.isColliding(bottles) && this.character.pepeBottle < 5 && bottles.y == 380) {
                if(sound == 0) bottles.save_sound.play();
                this.character.pepeBottle += 1;
                let calcBottle = 100 / 5 * this.character.pepeBottle;
                this.itemAnimation(bottles);
                this.bottleBar.setbottles(calcBottle);
            }
        });
    }

    checkKey(){
            return this.keyboard.shoot && this.character.pepeBottle > 0;
    }

    checkThrow() {
        if (this.checkKey()) {
            let direction = 'no';
            if (this.character.otherDirection) direction = 'yes';
            if (this.character.pepeBottle == 1) this.bottleReplace();
            pepeShootStop();
            if(sound == 0) pepeShootStart();
            this.character.longIdle = false;
            this.throw.push(new ThrowAbleObject(this.character.x + this.character.offsetw, this.character.y + this.character.offseth, direction, this.character.pepeBottle));
            this.character.pepeBottle -= 1;
            let calcBottle = 100 / 5 * this.character.pepeBottle;
            this.bottleBar.setbottles(calcBottle);
            setInterval(() => this.checkAttackBoss(direction), 20);
            setInterval(() => this.checkBottleOnGround(direction), 20);
        }
    }

    checkAttackBoss(direction) {
        this.throw.forEach((throwAttack) => {
            if (this.endboss.isColliding(throwAttack) && this.endboss.hit != throwAttack.bottle && this.endboss.power > 0) {
                this.endboss.hit = throwAttack.bottle;
                this.endboss.power -= 20;
                if(sound == 0) throwAttack.broke_sound.play();
                this.endbossBar.setPercentage(this.endboss.power);
                this.endboss.walktime = 0;
                this.endboss.endBossCollision();
                this.endboss.setDownCalc(0, 1);
                this.splashBottle.push(new SplahObject(throwAttack.x, throwAttack.y, direction));
                throwAttack.y = 1000;
                this.bottlesplash(1000);
                return true;
            }
        });
    }

    checkBottleOnGround(direction) {
        this.throw.forEach((throwAttack) => {
            if (throwAttack.y > 380 && throwAttack.y < 410) {
                this.splashBottle.push(new SplahObject(throwAttack.x, throwAttack.y, direction));
                if(sound == 0) throwAttack.broke_sound.play();
                this.bottlesplash(100);
            }
        });
    }

    bottlesplash(time) {
        this.splashBottle.forEach((splash) => {
            setInterval(() => splash.y = 1000, time);
        });
    }

    bottleReplace() {
        this.level.bottle = [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ]
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
                this.character.setDownCalc(2, 0);
            } else if (enemy.name == 'smallchicken') {
                this.character.setDownCalc(1, 0);
            }
            this.healthBar.setPercentage(this.character.energy);
            if(sound == 0) pepeOuchStart();
        }
    }

    endbossCollision() {
        if (!this.isDead()) {
            this.character.setDownCalc(6, 0);
            this.healthBar.setPercentage(this.character.energy);
            if(sound == 0) pepeOuchStart();
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
        if (checkpepeDead() == true) return this.addToMap(this.gameOver);
        if (checkendDead() == true) return this.addToMap(this.gameWON);
    }

    isEndbossDead() {
        if (this.endboss.power <= 0) {
            this.endboss.endBossDead();
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
        requestAnimationFrame(() => self.draw());
        let self = this;
        this.initWindow();
    }

    setReset() {
        this.character.characterReset();
        this.endboss.endbossReset();
        this.healthBar.percentage = 100;
        this.endbossBar.percentage = 100;
        this.camera_x = 100;
        allSoundsStop();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        startPage();
    }

    checkDead() {
        if (checkpepeDead() == true) setTimeout(() => this.setReset(), 4000);
    }

    checkEndboss() {
        if (checkendDead() == true) setTimeout(() => this.setReset(), 4000);
    }

    addObjectsToMap(object) {
        object.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);

        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
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
        windowResize();
    }
}