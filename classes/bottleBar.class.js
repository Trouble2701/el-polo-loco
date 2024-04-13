class BottleBar extends DrawableObject {
    bottleIMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    bottles = 0

    constructor(){
        super();
        this.loadImages(this.bottleIMAGES);
        this.x = 10;
        this.y = 130;
        this.height = 60;
        this.width = 200;
        this.setbottles(0);
    }

    setbottles(bottles){
        this.bottles = bottles;
        let path = this.bottleIMAGES[this.resolveImageIndex(this.bottles)]
        this.img = this.ImageCache[path];
    }
}