var playButton = document.getElementById("playButton");
var freqSlider = document.getElementById("freqSlider");
var isPlaying = false;

var context = new AudioContext();
var sound = new Audio("sound.wav");
var source = context.createMediaElementSource(sound);
var filter = context.createBiquadFilter();

playButton.addEventListener("click", function () {
    if (isPlaying) {
        sound.pause();
        playButton.innerHTML = "PLAY";
    } else {
        sound.play();
        playButton.innerHTML = "STOP";
    }

    isPlaying = !isPlaying;
});

freqSlider.addEventListener("mousemove", function() {
    filter.frequency.value = this.value;
});

//var oscillator = context.createOscillator();
//oscillator.type = "triangle";
//var sineGain = context.createGain();
//sineGain.gain.value = 970;
//oscillator.frequency.value = 0.2;
//oscillator.connect(sineGain);
//sineGain.connect(filter.frequency);
//oscillator.start();

sound.loop = true;
source.connect(filter);
filter.connect(context.destination);

filter.type = "bandpass";
filter.frequency.value = 1000;
filter.Q.value = 2;
filter.gain.value = -20;

// sound.play();

