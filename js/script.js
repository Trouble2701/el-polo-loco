let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = sdoc('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is: ', world.character);
    console.log('Chicken is: ', world.enemies);
    console.log('Cloud is: ', world.clouds);
}

window.addEventListener('keydown', (event) => {
    console.log(event.keyCode);
    if(event.keyCode == 37){
        keyboard.left = true;
    }

    if(event.keyCode == 39){
        keyboard.right = true;
    }

    if(event.keyCode == 32){
        keyboard.space = true;
    }

    if(event.keyCode == 83){
        keyboard.shoot = true;
    }
});

window.addEventListener('keyup', (event) => {
    console.log(event.keyCode);
    if(event.keyCode == 37){
        keyboard.left = false;
    }

    if(event.keyCode == 39){
        keyboard.right = false;
    }

    if(event.keyCode == 32){
        keyboard.space = false;
    }

    if(event.keyCode == 83){
        keyboard.shoot = false;
    }
});

function mouseDown(key){
    if(key == 'left'){
        keyboard.left = true;
    }

    if(key == 'right'){
        keyboard.right = true;
    }

    if(key == 'Jump'){
        keyboard.space = true;
    }
}

function mouseUp(key){
    if(key == 'left'){
        keyboard.left = false;
    }

    if(key == 'right'){
        keyboard.right = false;
    }

    if(key == 'Jump'){
        keyboard.space = false;
    }
}