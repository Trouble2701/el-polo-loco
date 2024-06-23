let canvas;
let world;
let keyboard = new Keyboard();
let pepeDead = 1;
let endbossDead = 1;
let time = 0;
let sound = 0;
let keyShow = 0;

function sdoc(id){
    return document.getElementById(id);
}

function startPage() {
    if(sdoc('startscreen').style.transform == '') sdoc('startscreen').style.transform = 'translateY(-2000px)';
    canvas = sdoc('canvas');
    sdoc('configGame').style.display = 'none';
    sdoc('newGame').style.display = 'flex';
    clearAllIntervals();
    if(sound == 0) startSoundPlay();
}

function clearAllIntervals() {
    world = undefined;
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function initLevel() {
    keyShow = 0;
    pepeDead = 0;
    endbossDead = 0;
    startSound.pause();
    sdoc('newGame').style.display = 'none';
    sdoc('configGame').style.display = 'flex';
    initFirstLevel();
    world = new World(canvas, keyboard);
}

function GameDead(dead) {
    if (dead == 'pepe') {
        pepeDead = 1;
    } else {
        endbossDead = 1;
    }
}

function checkpepeDead() {
    if (pepeDead == 1) {
        return true;
    }
}

function checkendDead() {
    if (endbossDead == 1) {
        return true;
    }
}

function soundOff() {
    sound = 1;
    startSound.pause();
    allSoundsStop();
    sdoc('sound').setAttribute('onclick', 'soundOn()');
    sdoc('soundGame').setAttribute('onclick', 'soundOn()');
}

function soundOn() {
    sound = 0;
    if(sdoc('newGame').style.display == 'flex') startSound.play();
    sdoc('sound').setAttribute('onclick', 'soundOff()');
    sdoc('soundGame').setAttribute('onclick', 'soundOff()');
}

function keys(){
    keyShow = 1;
    sdoc('keyGame').setAttribute('onclick', 'keysStop()');
}

function keysStop(){
    keyShow = 0;
    sdoc('keyGame').setAttribute('onclick', 'keys()');
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) {
        keyboard.left = true;
    }

    if (event.keyCode == 39) {
        keyboard.right = true;
    }

    if (event.keyCode == 32) {
        keyboard.space = true;
    }

    if (event.keyCode == 83) {
        keyboard.shoot = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 37) {
        keyboard.left = false;
    }

    if (event.keyCode == 39) {
        keyboard.right = false;
    }

    if (event.keyCode == 32) {
        keyboard.space = false;
    }

    if (event.keyCode == 83) {
        keyboard.shoot = false;
    }
});

function mouseDown(key) {
    if (key == 'left') {
        keyboard.left = true;
    }

    if (key == 'right') {
        keyboard.right = true;
    }

    if (key == 'Jump') {
        keyboard.space = true;
    }

    if (key == 'shoot') {
        keyboard.shoot = true;
    }
}

function mouseUp(key) {
    if (key == 'left') {
        keyboard.left = false;
    }

    if (key == 'right') {
        keyboard.right = false;
    }

    if (key == 'Jump') {
        keyboard.space = false;
    }
    if (key == 'shoot') {
        keyboard.shoot = false;
    }
}