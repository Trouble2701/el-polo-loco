let canvas;
let world;

function init(){
    canvas = sdoc('canvas');
    world = new World(canvas);
    console.log('My Character is: ', world.character);
    console.log('Chicken is: ', world.enemies);
}