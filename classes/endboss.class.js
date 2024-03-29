class Endboss extends MoveableObject{
 
    IMAGES_WALK = [
        `img/4_enemie_boss_chicken/2_alert/G5.png`,
        `img/4_enemie_boss_chicken/2_alert/G6.png`,
        `img/4_enemie_boss_chicken/2_alert/G7.png`,
        `img/4_enemie_boss_chicken/2_alert/G8.png`,
        `img/4_enemie_boss_chicken/2_alert/G9.png`,
        `img/4_enemie_boss_chicken/2_alert/G10.png`,
        `img/4_enemie_boss_chicken/2_alert/G11.png`,
        `img/4_enemie_boss_chicken/2_alert/G12.png`
    ];
    world;
    walking_sound = new Audio('./audio/chicken_boss.mp3');
    constructor(){
        super().loadImage(`img/4_enemie_boss_chicken/2_alert/G5.png`);
        this.loadImages(this.IMAGES_WALK);
        this.x = 2350;
        this.y = -20;
        this.height = 500;
        this.width = 500;
        this.animation();
    }

    animation(){
        this.walking_sound.pause();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
            if(this.world.character.x > 1900){
                this.walking_sound.play();
            }
            if(this.world.character.x < 1900){
                this.walking_sound.pause();
            }
        }, 100);
    }
}