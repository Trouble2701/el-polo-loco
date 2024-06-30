let canvas;
let world;
let keyboard = new Keyboard();
let pepeDead = 1;
let endbossDead = 1;
let time = 0;
let sound = 0;
let keyShow = 0;

/**
 * This funtion returned the document id
 * @param {*} id - this is the variable of document
 * @returns - document
 */
function sdoc(id){
    return document.getElementById(id);
}

/**
 * This function closed startscreen and Open the startPage of Game and Starts the Startsound
 * @param canvas - this variable is for canvas document
 * @param sound - this variable is the for the Soundoption
 */
function startPage() {
    if(sdoc('startscreen').style.transform == '') sdoc('startscreen').style.transform = 'translateY(-2000px)';
    canvas = sdoc('canvas');
    sdoc('configGame').style.display = 'none';
    sdoc('newGame').style.display = 'flex';
    clearAllIntervals();
    if(sound == 0) startSoundPlay();
    setTimeout(() => sdoc('headline').style.display = 'unset', 100);
}

/**
 * this funtion stop all Intervals and set world to undefined
 * @param i - this variable is for id of intervals 
 */
function clearAllIntervals() {
    world = undefined;
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function closedWonScreen(){
    sdoc('wonScreen').style.display = 'none';
}

/**
 * This function start the game and initials the first level
 * @param world - initalis the world.class.js
 * @param canvas - initials the canvas document
 * @param keyboard - keys for game
 */
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

/**
 * this function set dead parameter
 * @param {*} dead - This variable passes the value Pepe or Endboss
 */
function GameDead(dead) {
    if (dead == 'pepe') {
        pepeDead = 1;
    } else {
        endbossDead = 1;
    }
}

/**
 * this function checked dead of pepe
 * @returns - give true return
 */
function checkpepeDead() {
    if (pepeDead == 1) {
        return true;
    }
}

/**
 * this function checked dead of endboss
 * @returns - give true return
 */
function checkendDead() {
    if (endbossDead == 1) {
        return true;
    }
}

/**
 * this function turn sound off
 */
function soundOff() {
    sound = 1;
    startSound.pause();
    allSoundsStop();
    sdoc('sound').setAttribute('onclick', 'soundOn()');
    sdoc('soundGame').setAttribute('onclick', 'soundOn()');
}

/**
 * this function turn sound on
 */
function soundOn() {
    sound = 0;
    if(sdoc('newGame').style.display == 'flex') startSound.play();
    sdoc('sound').setAttribute('onclick', 'soundOff()');
    sdoc('soundGame').setAttribute('onclick', 'soundOff()');
}

/**
 * this function stop game for show Keys of game
 */
function keys(){
    keyShow = 1;
    sdoc('controlsInGame').style.display = 'flex';
    sdoc('keyGame').setAttribute('onclick', 'keysStop()');
}

/**
 * this function start game and Closed show Keys of game
 */
function keysStop(){
    keyShow = 0;
    sdoc('controlsInGame').style.display = 'none';
    sdoc('keyGame').setAttribute('onclick', 'keys()');
}

/**
 * this function checked of press keys and changed key to true
 */
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

/**
 * this function checked of keyup keys and changed key to false
 */
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

/**
 * this function checked of touchstart keys and changed key to true
 */
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

/**
 * this function checked of touchend keys and changed key to false
 */
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