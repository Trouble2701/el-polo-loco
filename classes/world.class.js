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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkColliding();
        setStopAbleInterval(this.checkActions, 100);
        setStopAbleInterval(this.checkAllDeads, 100);
        setStopAbleInterval(this.startGame, 1000);
    }
    /**
     * this function ist the gameTime
     */
    startGame() {
        world.gameTime+=1;
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
        world.checkThrow();
    }

    /**
     * This function checks dead of character oder endboss
     */
    checkAllDeads() {
        world.endboss.isEndbossDead();
        world.checkDead();
    }

    /**
     * This function checks colliding of objects
     */
    checkColliding() {
        setStopAbleInterval(this.checkEnemy, 50);
        setStopAbleInterval(this.checkBoss, 50);
        setStopAbleInterval(this.checkCoin, 50);
        setStopAbleInterval(this.checkBottle, 50);
        setStopAbleInterval(this.checkEndboss, 50);
    }

    /**
     * This function checks colliding with character and enemy
     */
    checkEnemy() {
        world.level.enemies.forEach((enemy) => {
            if (world.character.isColliding(enemy) && enemy.dead == 0) world.collisionOrDead(enemy); else world.character.pepeCollision(0);
        });
    }

    /**
     * This function checks colliding with character and endboss
     */
    checkBoss() {
        if (world.character.isColliding(world.endboss) && world.endboss.power > 0) {
            world.character.pepeCollision(1);
            world.endbossCollision();
        } else {
            world.character.pepeCollision(0);
        }
    }

    /**
     * This function checks colliding with character and coin
     */
    checkCoin() {
        world.level.coin.forEach((coins) => {
            if (world.character.isColliding(coins) && world.character.pepeCoins < 8 && coins.hit == 0) {
                world.character.pepeCoins += 1;
                let calcCoins = 100 / 8 * world.character.pepeCoins;
                if (sound == 0) coins.save_sound.play();
                world.character.itemAnimation(coins);
                world.coinBar.setCoins(calcCoins);
                coins.hit = 1;
            }
        });
    }

    /**
     * This function checks colliding with character and bottle
     */
    checkBottle() {
        world.level.bottle.forEach((bottles) => {
            if (world.character.isColliding(bottles) && world.character.pepeBottle < 5 && bottles.y == 380) {
                if (sound == 0) bottles.save_sound.play();
                world.character.pepeBottle += 1;
                world.collectedBottles += 1;
                let calcBottle = 100 / 5 * world.character.pepeBottle;
                world.character.itemAnimation(bottles);
                world.bottleBar.setbottles(calcBottle);
            }
        });
    }

    /**
     * This function checks press shoot key
     */
    checkKey() {
        return world.keyboard.shoot && world.character.pepeBottle > 0 && world.keyShootFree == 0;
    }

    /**
     * This function checks whether it was thrown and triggers if true
     */
    checkThrow() {
        if (world.checkKey()) {
            world.keyShootFree = 1;
            world.character.throwAction();
            pepeShootStop();
            if (sound == 0) pepeShootStart();
            world.throw.push(new ThrowAbleObject(world.character.x + world.character.offsetw, world.character.y + world.character.offseth, world.directionCheck(), world.character.pepeBottle));
            world.character.pepeBottle -= 1;
            let calcBottle = 100 / 5 * world.character.pepeBottle;
            world.bottleBar.setbottles(calcBottle);
            setStopAbleInterval(this.checkAttackBoss, 20);
            setStopAbleInterval(this.checkBottleOnGround, 20);
        }
    }

    /**
     * This function checks whether the bottle touches the ground and triggers if true
     * @param {*} direction - direction of bottle
     */
    checkBottleOnGround() {
        world.throw.forEach((throwAttack) => {
            if (throwAttack.y > 380 && throwAttack.y < 410) {
                world.splashBottle.push(new SplahObject(throwAttack.x, throwAttack.y, world.directionCheck(), throwAttack.bottle));
                if (sound == 0) throwAttack.broke_sound.play();
                world.bottlesplash(1000);
            }
        });
    }

    /**
     * This function checks whether the bottle touches the final boss and triggers if true
     * @param {*} direction - direction of bottle
     */
    checkAttackBoss() {
        world.throw.forEach((throwAttack) => {
            if (world.endboss.isColliding(throwAttack) && world.endboss.hit != throwAttack.bottle && world.endboss.power > 0) {
                if (sound == 0) throwAttack.broke_sound.play();
                world.attackTheEndboss(throwAttack);
                world.splashBottle.push(new SplahObject(throwAttack.x, throwAttack.y, world.directionCheck(), throwAttack.bottle));
                throwAttack.y = 1000;
                world.bottlesplash(1000);
                return true;
            }
        });
    }

    /**
     * this function check the direction of Character
     */
    directionCheck(){
        let direction = 'no';
        if (world.character.otherDirection) direction = 'yes';
        return direction;
    }

    /**
     * This function checks the death of the character and triggers if true
     */
    checkDead() {
        if (checkpepeDead() == true) setTimeout(() => startPage(), 2500);
    }

    /**
     * This function checks the death of the endboss and triggers if true
     */
    checkEndboss() {
        if (checkendDead() == true) {
            setTimeout(() => {
                showEndScore(world.gameTime, world.character.pepeCoins, world.collectedBottles, world.killedChicken, world.killedSmallChicken);
                startPage();
            }, 2000);
        }
    }

    /**
     * This function checks whether the opponent is dead or whether a collision with the character needs to be triggered
     * @param {*} enemy -  - This variable indicates whether it is a chicken or a chick
     */
    collisionOrDead(enemy) {
        if (world.chickenKill(enemy)) {
            world.character.smalJump();
            if (enemy.name == 'smallchicken') world.killedSmallChicken += 1; else world.killedChicken += 1;
            enemy.dead = 1;
            setTimeout(() => enemy.y = 1000, 2000);
        } else {
            world.character.pepeCollision(1);
            world.chickenCollision(enemy);
        }
    }

    /**
     * This function checks whether the chicken is killed and returns true if correct
     * @param {*} enemy - This variable indicates whether it is a chicken or a chick
     */
    chickenKill(enemy) {
        return world.character.isColliding(enemy) && world.character.isAboveGround() && world.character.lastY < world.character.y;
    }

    /**
     * This function is responsible for attacking the boss and gives new values ​​when hit
     * @param {*} throwAttack - bottle attack
     */
    attackTheEndboss(throwAttack) {
        world.endboss.hit = throwAttack.bottle;
        world.endboss.power -= 20;
        world.endbossBar.setPercentage(world.endboss.power);
        world.endboss.walktime = 0;
        world.endboss.endBossCollision();
        world.endboss.setDownCalc(0, 1);
    }

    /**
     * This function starts the animation of the splash from the bottle
     * @param {*} time - time of splash
     */
    bottlesplash(time) {
        setStopAbleInterval(this.splashOfBottle, time);
    }

    splashOfBottle(){
        world.splashBottle.forEach((splash) => {
            splash.y = 1000;
            world.keyShootFree = 0;
        }
        );
    }

    /**
     * This function transfers the new values ​​in the event of a collision between the character and the chicken or chick
     * @param {*} enemy - Chicken or Chick
     */
    chickenCollision(enemy) {
        if (!world.character.isDead() && world.endboss.power > 0) {
            world.character.energyCalc(enemy.name)
            world.healthBar.setPercentage(world.character.energy);
            if (sound == 0) pepeOuchStart();
        }
    }

    /**
     * This function transfers the new values ​​in the event of a collision between the character and the endboss
     */
    endbossCollision() {
        if (!world.character.isDead()) {
            world.character.setDownCalc(6, 0);
            world.healthBar.setPercentage(world.character.energy);
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