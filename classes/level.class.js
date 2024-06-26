/**
 * This class sets the level1.js Image on the map
 */
class Level {
    /**
     * @param enemies - parameter for chicken and smallchicken
     * @param clounds - parameter for clounds
     * @param background - parameter for backgrund
     * @param coin - parameter for coins
     * @param bottle - parameter for bottles
     * @param level_end_x - parameter for end of level
     */
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