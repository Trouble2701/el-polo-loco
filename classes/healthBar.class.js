/**
 * This class creates the bar from the character health
 */
class Healthbar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.height = 60;
        this.width = 200;
        this.setPercentage(100);
    }

    /**
     * This function sets the fill level of the bar depending on the number of health collected
    * @param {*} percentage - The number of health is passed here to determine the value of the quantity
    */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(this.percentage)];
        this.img = this.ImageCache[path];
        this.y = 20;
    }
}