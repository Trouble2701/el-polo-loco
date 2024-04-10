class Coin extends MoveableObject{
    x;
    y;
    IMAGES_WALK =[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(){
        super().loadImage(`img/8_coin/coin_1.png`);
        this.loadImages(this.IMAGES_WALK);
        this.x = this.calcPosition(0, 2000);
        this.y = this.calcPosition(30, 300);
        this.height = 100;
        this.width = 100;
        this.animation();
    }

    animation(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 500);
    }
}