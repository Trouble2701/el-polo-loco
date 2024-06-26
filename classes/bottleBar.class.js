/**
 * This class creates the bar from the bottles
 */
class BottleBar extends DrawableObject {
    bottleIMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    /**
     * @param bottle - number of bottles
     * @param world - give this class in the world.class.js back
     */
    bottles = 0
    world;
    constructor(){
        super();
        this.loadImages(this.bottleIMAGES);
        this.x = 10;
        this.y = 130;
        this.height = 60;
        this.width = 200;
        this.setbottles(0);
    }

/**
 * This function sets the fill level of the bar depending on the number of bottles collected
 * @param {*} bottles - The number of bottles is passed here to determine the value of the quantity
 */
    setbottles(bottles){
        this.bottles = bottles;
        let path = this.bottleIMAGES[this.resolveImageIndex(this.bottles)]
        this.img = this.ImageCache[path];
    }

/**
 * this function resets the incorrect ones if the character has missed all of them
 */
    bottleReplace() {
        this.world.level.bottle = [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ]
    }
}