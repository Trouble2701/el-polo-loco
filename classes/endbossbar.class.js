/**
 * This class creates the bar from the endboss
 */
class EndbossBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    /**
     * @param percentage - number of percent
     */
    percentage = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.height = 60;
        this.width = 200;
        this.setPercentage(100);
    }

    /**
     * This function sets the fill level of the bar depending on the number of Endboss health collected
    * @param {*} percentage - The number of Endboss health is passed here to determine the value of the quantity
    */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(this.percentage)];
        this.img = this.ImageCache[path];
        this.y = 20;
    }
}