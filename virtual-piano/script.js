const body = document.getElementById("body");
const screen = document.getElementById("screen");
const letters = document.querySelector(".btn-letters");
const notes = document.querySelector(".btn-notes");
const piano = document.querySelector(".piano");
let pianokeys = document.querySelectorAll(".piano-key");

function fullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
function getLetters() {
    if (!letters.classList.contains('btn-active')) {
        var a;
        letters.classList.add("btn-active");
        notes.classList.remove("btn-active");
        pianokeys.forEach(
            function test(e) {
                e.classList.toggle('piano-key-letter');

            }
        );
    }
}

function getNotes() {
    if (!notes.classList.contains('btn-active')) {
        var a;
        letters.classList.remove("btn-active");
        notes.classList.add("btn-active");
        pianokeys.forEach(
            function test(e) {
                e.classList.toggle('piano-key-letter');

            }
        );
    }

}

var mouseDown = 0;
document.body.onmousedown = function () {
    ++mouseDown;
}
document.body.onmouseup = function () {
    --mouseDown;
}

piano.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('piano-key')) {
        const audio = new Audio(`assets/audio/${event.target.dataset.note}.mp3`);
        audio.play();
        event.target.classList.add('piano-key-active');
        event.target.classList.add('piano-key-active-pseudo');
    }
    piano.addEventListener('mouseout', (e2) => {
        e2.target.classList.remove('piano-key-active');
        e2.target.classList.remove('piano-key-active-pseudo');
        audio = new Audio();
    })
    piano.addEventListener('mouseover', (e) => {
        if (mouseDown) {
            e.target.classList.add('piano-key-active');
            e.target.classList.add('piano-key-active-pseudo');
            audio = new Audio(`assets/audio/${e.target.dataset.note}.mp3`);
            audio.play();
        }

    })
    piano.addEventListener('mouseup', (e3) => {
        e3.target.classList.remove('piano-key-active');
        e3.target.classList.remove('piano-key-active-pseudo');
    })

});

if (!mouseDown) {
    pianokeys.forEach(
        function test(e) {
            e.classList.remove('piano-key-active');

        }
    );
}
var down = 0;
window.addEventListener('keydown', (event) => {
    down++;
    while (down == 1) {
        pianokeys.forEach(
            function test(e) {
                if (`Key${e.dataset.letter}` == event.code) {
                    const audio = new Audio(`assets/audio/${e.dataset.note}.mp3`);
                    audio.play();
                    e.classList.add('piano-key-active');
                    e.classList.add('piano-key-active-pseudo');
                    console.log(down);
                    down++;
                }
            }
        );
    }
});

window.addEventListener('keyup', (event) => {
    pianokeys.forEach(
        function test(e) {
            if (`Key${e.dataset.letter}` == event.code) {
                e.classList.remove('piano-key-active');
                e.classList.remove('piano-key-active-pseudo');
                console.log(down);
                down = 0;
            }
        }
    );
})


notes.addEventListener("click", getNotes);
letters.addEventListener("click", getLetters);
screen.addEventListener("click", fullScreen);