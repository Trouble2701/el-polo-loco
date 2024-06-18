let startSound = new Audio('audio/startsound.mp3');
let pepe_walking_sound = new Audio('./audio/pepe_walking.mp3');
let pepe_jump_sound = new Audio('./audio/pepe_jump.mp3');
let pepe_sleep_sound = new Audio('./audio/pepe_sleep.mp3');
let pepe_shoot_sound = new Audio('./audio/pepshoot.mp3');
let pepe_ouch_sound = new Audio('./audio/hurtpepe.mp3');
let chick_walking_sound = new Audio('./audio/chicken.mp3');
let smallChicken_walking_sound = new Audio('./audio/small_chicken.mp3');
let endboss_walking_sound = new Audio('./audio/bossrunning.mp3');
let endboss_alert_sound = new Audio('./audio/chicken_boss.mp3');
let endboss_hurt_sound = new Audio('./audio/hurtBoss.mp3');

function startSoundPlay() {
    startSound.play();
    setInterval(() => {
        if (time > 61) {
            startSound.pause();
            startSound.play();
            time = 0;
        }
        time++;
    }, 1000);
}

function pepeWalkStart(){
    pepe_walking_sound.play();
}

function pepeJumpStart(){
    pepe_jump_sound.play();
}

function pepeShootStart(){
    pepe_shoot_sound.play();
}

function pepeSleepStart(){
    pepe_sleep_sound.play();
}

function pepeOuchStart(){
    pepe_ouch_sound.play();
}

function pepeWalkStop(){
    pepe_walking_sound.pause();
}

function pepeJumpStop(){
    pepe_jump_sound.pause();
}

function pepeShootStop(){
    pepe_shoot_sound.pause();
}

function pepeSleepStop(){
    pepe_sleep_sound.pause();
}

function pepeOuchStop(){
    pepe_ouch_sound.pause();
}

function pepeSoundStop(){
    pepe_jump_sound.pause();
    pepe_walking_sound.pause();
    pepe_sleep_sound.pause();
    pepe_shoot_sound.pause();
    pepe_ouch_sound.pause();
}

function chickenStart(){
    chick_walking_sound.play();
}

function chickenStop(){
    chick_walking_sound.pause();
}

function smallChickenStart(){
    smallChicken_walking_sound.play();
}

function smallChickenStop(){
    smallChicken_walking_sound.pause();
}

function endbossAlertStart(){
    endboss_alert_sound.play();
}

function endbossHurtStart(){
    endboss_hurt_sound.play();
}

function endbossWalkingStart(){
    endboss_walking_sound.play();
}

function endbossAlertStop(){
    endboss_alert_sound.pause();
}

function endbossHurtStop(){
    endboss_hurt_sound.pause();
}

function endbossWalkingStop(){
    endboss_walking_sound.pause();
}

function endbossStop(){
    endbossAlertStop();
    endbossHurtStop();
    endbossWalkingStop();
}

function allSoundsStop(){
    pepeSoundStop();
    chickenStop();
    smallChickenStop();
    endbossStop();
}
