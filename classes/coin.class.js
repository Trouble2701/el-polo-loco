class Coin extends MoveableObject{
    x;
    y;
    height = 100;
    width = 100;
    coins = 0;
    offsetx = 30;
    offsety = 30;
    offsetw = 60;
    offseth = 60;
    save_sound = new Audio('./audio/coin.mp3');
    IMAGES_WALK =[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(){
        super().loadImage(`img/8_coin/coin_1.png`);
        this.loadImages(this.IMAGES_WALK);
        this.x = this.calcPosition(150, 1980);
        this.y = this.calcPosition(30, 280);
        this.animation();
    }

    animation(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 500);
    }
}