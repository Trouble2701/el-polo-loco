let canvas;
let world;
let keyboard = new Keyboard();
let pepeDead = 1;
let endbossDead = 1;
let timeOfSound = 0;
let sound = 0;
let keyShow = 0;
let i = 0;
let animationFrame;
let intervals = 11000;

/**
 * This funtion returned the document id
 * @param {*} id - this is the variable of document
 * @returns - document
 */
function sdoc(id) {
    return document.getElementById(id);
}

/**
 * This function closed startscreen and Open the startPage of Game and Starts the Startsound
 */
function startPage() {
    if (sdoc('startscreen').style.transform == '') sdoc('startscreen').style.transform = 'translateY(-2000px)';
    canvas = sdoc('canvas');
    sdoc('configGame').style.display = 'none';
    sdoc('newGame').style.display = 'flex';
    if (sdoc('newGame').style.display == 'flex') gameOverOut();
    clearAll();
    if (sound == 0) startSoundPlay();
    setTimeout(() => sdoc('headline').style.display = 'unset', 100);
}

/**
 * this funtion stop all Intervals and set world to undefined
 */
function setDefault() {
    setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        world = undefined;
        i = 0;
        setTimeout(() => startButton(), 1000);
        setTimeout(() => startPage(), 1050);
    }, 1500);
}

function clearAll() {
    for (i = 0; i < intervals; i++) {
        window.clearInterval(i);
    };
}

function closedWonScreen() {
    sdoc('wonScreen').style.display = 'none';
}

/**
 * This function start the game and initials the first level
 */
function initLevel() {
    closedShowScreen();
    stopButton()
    keyShow = 0;
    pepeDead = 0;
    endbossDead = 0;
    sdoc('newGame').style.display = 'none';
    sdoc('configGame').style.display = 'flex';
    initFirstLevel();
    world = new World(canvas, keyboard);
    setInterval(() => gameOver(), 100);
    if (sound == 0) startSoundPlay();
}

function stopButton() {
    sdoc('startButton').setAttribute('onclick', '');
    sdoc('wonButton').setAttribute('onclick', '');
    sdoc('startButton').innerHTML = 'Loading';
    sdoc('wonButton').innerHTML = 'Loading';
    sdoc('startButton').style.backgroundColor = 'rgba(128, 128, 128)';
    sdoc('wonButton').style.backgroundColor = 'rgba(128, 128, 128)';
}

function startButton() {
    sdoc('startButton').setAttribute('onclick', 'initLevel()');
    sdoc('wonButton').setAttribute('onclick', 'closedWonScreen()');
    sdoc('startButton').innerHTML = 'Start New Game';
    sdoc('wonButton').innerHTML = 'Back to Menu';
    sdoc('startButton').style.backgroundColor = '#FFA300';
    sdoc('wonButton').style.backgroundColor = '#FFDF00';
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
    startSound.currentTime = 0;
    timeOfSound = 0;
    allSoundsStop();
    sdoc('sound').setAttribute('onclick', 'soundOn()');
    sdoc('soundGame').setAttribute('onclick', 'soundOn()');
}

/**
 * this function turn sound on
 */
function soundOn() {
    sound = 0;
    startSound.currentTime = 0;
    timeOfSound = 0;
    if (sdoc('newGame').style.display == 'flex') startSound.play();
    sdoc('sound').setAttribute('onclick', 'soundOff()');
    sdoc('soundGame').setAttribute('onclick', 'soundOff()');
}

/**
 * this function stop game for show Keys of game
 */
function keys() {
    keyShow = 1;
    sdoc('controlsInGame').style.display = 'flex';
    sdoc('keyGame').setAttribute('onclick', 'keysStop()');
}

/**
 * this function start game and Closed show Keys of game
 */
function keysStop() {
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
        intervalIds
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