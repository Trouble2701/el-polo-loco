/**
 * This function go in Browser Fullscreen
 * @param elem - is the DIV 
 */
function fullOn() {
    var elem = sdoc('mobile');

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    sdoc('screen').setAttribute('onclick', 'fullOff()');
    sdoc('screenGame').setAttribute('onclick', 'fullOff()');
}

/**
 * This function go out of Browser Fullscreen
 * @param document - is all of body
 */
function fullOff() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    sdoc('screen').setAttribute('onclick', 'fullOn()');
    sdoc('screenGame').setAttribute('onclick', 'fullOn()');
}

/**
 * This function checked window size
 * @param width - is the the width of browserscreen
 * @param hidth - is the the hidth of browserscreen
 */
function windowResize() {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (width <= 1301 && height > width) {
        landscapeScreen( 'none', 'flex');
    } else {
        resizeAction();
    }

    if(width > 1400){
        sdoc('canvas').style.width = '720px';
        sdoc('canvas').style.height = '480px';    
    }
}

/**
 * This function changed settings of divs and Scolled on top
 */
function resizeAction() {
    window.scrollTo(0, 0);
    landscapeScreen('flex', 'none');
    sdoc('canvas').style.width = '100vw';
    sdoc('canvas').style.height = 'calc(100vh - 69px)';
    sdoc('button').style.width = '100vw';
}

/**
 * This function checked the landscape setting
 */
function landscapeScreen(newGame, show) {
    sdoc('landscape').style.display = show;
    sdoc('newGame').style.display = newGame;
}

/**
 * This function start interval for the windowResize function
 */
function setWindowResize() {
    setInterval(() => {
        windowResize();
    }, 100);
}

/**
 * This function displays the privacy policy screen
 */
function privatePolicy(){
    sdoc('showScreen').style.display = 'flex';
    privatePolicyScreen();
}

/**
 * This function displays the impressum screen
 */
function impressum(){
    sdoc('showScreen').style.display = 'flex';
    impressumScreen();
}


/**
 * This function closed the privacy policy/impressum screen
 */
function closedShowScreen(){
    sdoc('showScreen').style.display = 'none';
    sdoc('showScreenText').innerHTML = '';
}