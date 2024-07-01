/**
 * This class draws the requested objects
 */
class DrawableObject {
    img;
    ImageCache = {};
    currentImage = 0;
    x = 0;
    y = 135;
    height = 300;
    width = 100;

    /**
     * This function loads the respective image
     * @param {*} path - path of image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function draws the images and puts them in their position
     * @param {*} ctx - this is the variable for canvas 
     */
    draw(ctx) {
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }catch(e){
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }
    
    /**
     * This function loads the array of images into the imageCache
     * @param {*} arr - this variable passes an array of images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    /**
     * This function passes a percentage value to choose the correct image
     * @param {*} setImages - This variable passes a percentage value
     * @returns - an array position is returned
     */
    resolveImageIndex(setImages){
        if(setImages > 98){
            return 5;
        }else if(setImages > 79){
            return 4;
        }else if(setImages > 59){
            return 3;
        }else if(setImages > 39){
            return 2;
        }else if(setImages > 19){
            return 1;
        }else{
            return 0;
        }
    }
}