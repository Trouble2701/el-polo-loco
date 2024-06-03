let canvas;
let world;
let keyboard = new Keyboard();
let startSound = new Audio('./audio/startsound.mp3');

function init() {
    canvas = document.getElementById('canvas');
    startSound.play();
}

function initLevel() {
    startSound.pause();
    document.getElementById('newGame').style.display == 'none';
    setTimeout(() => {
        initFirstLevel();
        world = new World(canvas, keyboard);
    }, 100);
}

function soundOff(){
    startSound.pause();
    document.getElementById('sound').setAttribute('onclick', 'soundOn()');
}

function soundOn(){
    startSound.play();
    document.getElementById('sound').setAttribute('onclick', 'soundOff()');
}

function fullOn(){
    var elem = document.getElementById('mobile');

    if(elem.requestFullscreen){
        elem.requestFullscreen();
    }
    else if(elem.mozRequestFullScreen){
        elem.mozRequestFullScreen();
    }
    else if(elem.webkitRequestFullscreen){
        elem.webkitRequestFullscreen();
    }
    else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen();
    }
    document.getElementById('screen').setAttribute('onclick', 'fullOff()');
}

function fullOff(){
    if(document.exitFullscreen){
        document.exitFullscreen();
    }
    else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }
    else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }
    else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }
    document.getElementById('screen').setAttribute('onclick', 'fullOn()');
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

    if (key == 'startGame') {
        keyboard.startGame = true;
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