class NewGame extends DrawableObject {
    stop = false;
    constructor(){
        super();
        this.loadImage('img/9_intro_outro_screens/start/startscreen_1.png');
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}