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

function windowResize() {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (width <= 1301 && height > width) {
        landscapeScreen('flex');
    } else {
        resizeAction();
    }

    if(width > 1300){
        sdoc('canvas').style.width = '720px';
        sdoc('canvas').style.height = '480px';    
    }
}

function resizeAction() {
    window.scrollTo(0, 0);
    landscapeScreen('none');
    sdoc('canvas').style.width = '100vw';
    sdoc('canvas').style.height = 'calc(100vh - 69px)';
    sdoc('button').style.width = '100vw';
}

function landscapeScreen(show) {
    sdoc('landscape').style.display = show;
}

function setWindowResize() {
    setInterval(() => {
        windowResize();
    }, 100);
}