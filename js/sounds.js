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

/**
 * This function start the Startsound and replayed this sound after end
 */
function startSoundPlay() {
    if (world == undefined) {
        playStartSound();
    } else {
        stopStartSound();
    }
}

function playStartSound() {
    timeOfSound = 0;
    startSound.play();
    setInterval(() => {
        if (timeOfSound > 61 && pepeDead == 1) {
            startSound.pause();
            startSound.currentTime = 0;
            startSound.play();
            timeOfSound = 0;
        }
        timeOfSound++;
    }, 1000);
}

function stopStartSound() {
    startSound.pause();
    startSound.currentTime = 0;
    timeOfSound = 0;
}

/**
 * The function with Start on the End start the Sound
 */
function pepeWalkStart() {
    pepe_walking_sound.play();
}

function pepeJumpStart() {
    pepe_jump_sound.play();
}

function pepeShootStart() {
    pepe_shoot_sound.play();
}

function pepeSleepStart() {
    pepe_sleep_sound.play();
}

function pepeOuchStart() {
    pepe_ouch_sound.play();
}

function chickenStart() {
    chick_walking_sound.play();
}

function smallChickenStart() {
    smallChicken_walking_sound.play();
}

function endbossAlertStart() {
    endboss_alert_sound.play();
}

function endbossHurtStart() {
    endboss_hurt_sound.play();
}

function endbossWalkingStart() {
    endboss_walking_sound.play();
}


/**
 * The function with Stop on the End stop the Sound
 */
function pepeWalkStop() {
    pepe_walking_sound.pause();
    pepe_walking_sound.currentTime = 0;
}

function pepeJumpStop() {
    pepe_jump_sound.pause();
    pepe_jump_sound.currentTime = 0;
}

function pepeShootStop() {
    pepe_shoot_sound.pause();
    pepe_shoot_sound.currentTime = 0;
}

function pepeSleepStop() {
    pepe_sleep_sound.pause();
    pepe_sleep_sound.currentTime = 0;
}

function pepeOuchStop() {
    pepe_ouch_sound.pause();
    pepe_ouch_sound.currentTime = 0;
}

function pepeSoundStop() {
    pepe_jump_sound.pause();
    pepe_jump_sound.currentTime = 0;
    pepe_walking_sound.pause();
    pepe_walking_sound.currentTime = 0;
    pepe_sleep_sound.pause();
    pepe_sleep_sound.currentTime = 0;
    pepe_shoot_sound.pause();
    pepe_shoot_sound.currentTime = 0;
    pepe_ouch_sound.pause();
    pepe_ouch_sound.currentTime = 0;
}

function chickenStop() {
    chick_walking_sound.pause();
    chick_walking_sound.currentTime = 0;
}

function smallChickenStop() {
    smallChicken_walking_sound.pause();
    smallChicken_walking_sound.currentTime = 0;
}

function endbossAlertStop() {
    endboss_alert_sound.pause();
    endboss_alert_sound.currentTime = 0;
}

function endbossHurtStop() {
    endboss_hurt_sound.pause();
    endboss_hurt_sound.currentTime = 0;
}

function endbossWalkingStop() {
    endboss_walking_sound.pause();
    endboss_walking_sound.currentTime = 0;
}

function endbossStop() {
    endbossAlertStop();
    endbossHurtStop();
    endbossWalkingStop();
}

function allSoundsStop() {
    pepeSoundStop();
    chickenStop();
    smallChickenStop();
    endbossStop();
}