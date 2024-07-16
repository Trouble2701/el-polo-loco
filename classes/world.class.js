/**
 * This class creates the world
 */
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
    gameTime = 0;
    collectedBottles = 0;
    killedChicken = 0;
    killedSmallChicken = 0;
    keyShootFree = 0;
    won = 'no';
    time = 2500;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkColliding();
        setInterval(() => this.checkActions(), 100);
        setInterval(() => this.checkAllDeads(), 100);
        setInterval(() => this.startGame(), 1000);
        setInterval(() => this.clearAll(), 1000/60);
    }
    /**
     * this function ist the gameTime
     */
    startGame() {
        this.gameTime += 1;
    }

    /**
     * This function connects the world.class.js with others
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.bottleBar.world = this;
        this.level.coin.world = this;
    }

    /**
     * This function checks whether a bottle is thrown
     */
    checkActions() {
        this.checkThrow();
    }

    /**
     * This function checks dead of character oder endboss
     */
    checkAllDeads() {
        this.endboss.isEndbossDead();
    }

    /**
     * This function checks colliding of objects
     */
    checkColliding() {
        setInterval(() => this.checkEnemy(), 50);
        setInterval(() => this.checkBoss(), 50);
        setInterval(() => this.checkCoin(), 50);
        setInterval(() => this.checkBottle(), 50);
    }

    /**
     * This function checks colliding with character and enemy
     */
    checkEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.dead == 0) this.collisionOrDead(enemy); else this.character.pepeCollision(0);
        });
    }

    /**
     * This function checks colliding with character and endboss
     */
    checkBoss() {
        if (this.character.isColliding(this.endboss) && this.endboss.power > 0) {
            this.character.pepeCollision(1);
            this.endbossCollision();
        } else {
            this.character.pepeCollision(0);
        }
    }

    /**
     * This function checks colliding with character and coin
     */
    checkCoin() {
        this.level.coin.forEach((coins) => {
            if (this.character.isColliding(coins) && this.character.pepeCoins < 8 && coins.hit == 0) {
                this.character.pepeCoins += 1;
                let calcCoins = 100 / 8 * this.character.pepeCoins;
                if (sound == 0) coins.save_sound.play();
                this.character.itemAnimation(coins);
                this.coinBar.setCoins(calcCoins);
                coins.hit = 1;
            }
        });
    }

    /**
     * This function checks colliding with character and bottle
     */
    checkBottle() {
        this.level.bottle.forEach((bottles) => {
            if (this.character.isColliding(bottles) && this.character.pepeBottle < 5 && bottles.y == 380) {
                if (sound == 0) bottles.save_sound.play();
                this.character.pepeBottle += 1;
                this.collectedBottles += 1;
                let calcBottle = 100 / 5 * this.character.pepeBottle;
                this.character.itemAnimation(bottles);
                this.bottleBar.setbottles(calcBottle);
            }
        });
    }

    /**
     * This function checks press shoot key
     */
    checkKey() {
        return this.keyboard.shoot && this.character.pepeBottle > 0 && this.keyShootFree == 0;
    }

    /**
     * This function checks whether it was thrown and triggers if true
     */
    checkThrow() {
        if (this.checkKey()) {
            this.keyShootFree = 1;
            if(this.character.pepeBottle == 1) this.character.throwAction();
            pepeShootStop();
            if (sound == 0) pepeShootStart();
            this.throw.push(new ThrowAbleObject(this.character.x + this.character.offsetw, this.character.y + this.character.offseth, this.directionCheck(), this.character.pepeBottle));
            this.character.pepeBottle -= 1;
            let calcBottle = 100 / 5 * this.character.pepeBottle;
            this.bottleBar.setbottles(calcBottle);
            setInterval(() => this.checkAttackBoss(), 20);
            setInterval(() => this.checkBottleOnGround(), 20);
        }
    }

    /**
     * This function checks whether the bottle touches the ground and triggers if true
     * @param {*} direction - direction of bottle
     */
    checkBottleOnGround() {
        this.throw.forEach((throwAttack) => {
            if (throwAttack.y > 380 && throwAttack.y < 410) {
                this.splashBottle.push(new SplahObject(throwAttack.x, throwAttack.y, this.directionCheck(), throwAttack.bottle));
                if (sound == 0) throwAttack.broke_sound.play();
                this.bottlesplash(1000);
                this.throw = [];
            }
        });
    }

    /**
     * This function checks whether the bottle touches the final boss and triggers if true
     * @param {*} direction - direction of bottle
     */
    checkAttackBoss() {
        this.throw.forEach((throwAttack) => {
            if (this.endboss.isColliding(throwAttack) && this.endboss.power > 0) {
                if (sound == 0) throwAttack.broke_sound.play();
                this.attackTheEndboss(throwAttack);
                this.splashBottle.push(new SplahObject(throwAttack.x, throwAttack.y, this.directionCheck(), throwAttack.bottle));
                throwAttack.y = 1000;
                this.bottlesplash(1000);
                return true;
            }
        });
    }

    /**
     * this function check the direction of Character
     */
    directionCheck() {
        let direction = 'no';
        if (this.character.otherDirection) direction = 'yes';
        return direction;
    }

    clearAll() {
        if(this.checkAllDead()){
            setTimeout(() => {
                if (this.checkWon() == 'won') showEndScore(this.gameTime, this.character.pepeCoins, this.collectedBottles, this.killedChicken, this.killedSmallChicken);
                if (this.checkAllDead()) {
                    for (i = 0; i < intervals; i++) {
                        window.clearInterval(i);
                    };
                    if(i == intervals) setDefault();
                }
            }, this.checkTime());
        }
    }

    checkAllDead(){
        return checkendDead() == true || checkpepeDead() == true
    }

    checkTime(){
        if(checkendDead() == true) this.time = 2000
        return this.time;
    }

    checkWon(){
        if(checkendDead() == true) this.won = 'won';
        return this.won;
    }
    /**
     * This function checks whether the opponent is dead or whether a collision with the character needs to be triggered
     * @param {*} enemy -  - This variable indicates whether it is a chicken or a chick
     */
    collisionOrDead(enemy) {
        if (this.chickenKill(enemy)) {
            this.character.smalJump();
            if (enemy.name == 'smallchicken') this.killedSmallChicken += 1; else this.killedChicken += 1;
            enemy.dead = 1;
            setTimeout(() => enemy.y = 1000, 2000);
        } else {
            this.character.pepeCollision(1);
            this.chickenCollision(enemy);
        }
    }

    /**
     * This function checks whether the chicken is killed and returns true if correct
     * @param {*} enemy - This variable indicates whether it is a chicken or a chick
     */
    chickenKill(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.lastY < this.character.y;
    }

    /**
     * This function is responsible for attacking the boss and gives new values ​​when hit
     * @param {*} throwAttack - bottle attack
     */
    attackTheEndboss(throwAttack) {
        this.endboss.hit = throwAttack.bottle;
        this.endboss.power -= 20;
        this.endbossBar.setPercentage(this.endboss.power);
        this.endboss.walktime = 0;
        this.endboss.endBossCollision();
        this.endboss.setDownCalc(0, 1);
    }

    /**
     * This function starts the animation of the splash from the bottle
     * @param {*} time - time of splash
     */
    bottlesplash(time) {
        setInterval(() => this.splashOfBottle(), time);
    }

    splashOfBottle() {
        this.splashBottle.forEach((splash) => {
            splash.y = 1000;
            this.keyShootFree = 0;
            this.splashBottle = [];
        }
        );
    }

    /**
     * This function transfers the new values ​​in the event of a collision between the character and the chicken or chick
     * @param {*} enemy - Chicken or Chick
     */
    chickenCollision(enemy) {
        if (!this.character.isDead() && this.endboss.power > 0) {
            this.character.energyCalc(enemy.name)
            this.healthBar.setPercentage(this.character.energy);
            if (sound == 0) pepeOuchStart();
        }
    }

    /**
     * This function transfers the new values ​​in the event of a collision between the character and the endboss
     */
    endbossCollision() {
        if (!this.character.isDead()) {
            this.character.setDownCalc(6, 0);
            this.healthBar.setPercentage(this.character.energy);
            if (sound == 0) pepeOuchStart();
        }
    }
    /**
     * This function calculates the random position where the opponents will be placed
     * @param {*} min - this variable passes the minimum value
     * @param {*} max - this variable passes the maximim value
     */
    calcPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * this function draws the world
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.levelObjectAdded();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(this.camera_x, 0);
        this.opponentAndBottle();
        this.ctx.translate(-this.camera_x, 0);
        this.barsAdded();
        animationFrame = requestAnimationFrame(() => self.draw());
        let self = this;
        windowResize();
    }

    /**
     * this function added opponets and bottle animimations in the draw function
     */
    opponentAndBottle() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.throw);
        this.addObjectsToMap(this.splashBottle);
    }

    /**
     * this function added objects in the draw function
     */
    levelObjectAdded() {
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
    }

    /**
     * this function added bars in the draw function
     */
    barsAdded() {
        this.addToMap(this.healthBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
    }

    /**
     * This function adds all objects that need to be drawn
     * @param {*} object - the object to draw
     */
    addObjectsToMap(object) {
        object.forEach(o => this.addToMap(o));
    }

    /**
     * This function allows the images to be mirrored
     * @param {*} mo - object to flip
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * This function reflects the images
     * @param {*} mo - image to flip
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function reflects back the images
     * @param {*} mo - image to flip
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}