var context = new AudioContext();
var sound = new Audio("guitar_sample.mp3");
var source = context.createMediaElementSource(sound);

sound.loop = true;

//--- Effektkette
var effectChain = new EffectChain(context, source);
//var filter = new Filter(context);
//var tremolo = new Tremolo(context);
//effectChain.addEffect(filter);
//effectChain.addEffect(tremolo);
//effectChain.getOutput().connect(context.destination);
//effectChain.addEffect(tremolo);

//source.connect(tremolo.getInput());

/*
source.connect(filter.getInput());
filter.getOutput().connect(tremolo.getInput());
tremolo.getOutput().connect(context.destination);
*/

//filter.getOutput().connect(context.destination);

//--- GUI Steuerung



/*
var einzufuegendesObjekt = document.createElement("a");
einzufuegendesObjekt.href = "http://www.html-seminar.de";
einzufuegendesObjekt.innerHTML = "Tutorial für HTML, CSS und JavaScript";
einzufuegendesObjekt.style.backgroundColor = "#FFFF00";

document.getElementById("effectPedalWindow").appendChild(einzufuegendesObjekt);
*/

var playButton = document.getElementById("playButton");
var isPlaying = false;

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

document.getElementById("addEffectButton").addEventListener("click", function () {
    //var filter = new Filter(context);
    //effectChain.addEffect(filter);
    var tremolo = new Tremolo(context);
    effectChain.addEffect(tremolo);
});