/**
 * This class sets the level1.js Image on the map
 */
class Level {
    enemies;
    clouds;
    background;
    coin;
    bottle;
    level_end_x = 2246;

    constructor(enemies, clouds, background, coin, bottle){
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.coin = coin;
        this.bottle = bottle;
    }
}