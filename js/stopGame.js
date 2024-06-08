let intervalIds = [];
let i = 1;

function setStopAbleInterval(fn, time){
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

setStopAbleInterval(sayHello, 500);
setStopAbleInterval(sayGoodBye, 500);

function stopGame(){
    intervalIds.forEach(clearInterval);
}
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function sayHello(){
    console.log('hallo', i);
    i++;
}

function sayGoodBye(){
    console.log('tschüss', i);
    i++;
}