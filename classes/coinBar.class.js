/**
 * This class creates the bar from the coins
 */
class CoinBar extends DrawableObject {
    coinsIMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * @param coins - number of coins
     */
    coins = 0;

    constructor(){
        super();
        this.loadImages(this.coinsIMAGES);
        this.x = 10;
        this.y = 75;
        this.height = 60;
        this.width = 200;
        this.setCoins(0);
    }

    /**
    * This function sets the fill level of the bar depending on the number of coin collected
    * @param {*} coin - The number of coins is passed here to determine the value of the quantity
    */
    setCoins(coin){
        this.coins = coin;
        let path = this.coinsIMAGES[this.resolveImageIndex(this.coins)];
        this.img = this.ImageCache[path];
    }
}