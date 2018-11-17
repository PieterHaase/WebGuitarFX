var context = new AudioContext();
var sound = new Audio("media/guitar_sample.mp3");
var source = context.createMediaElementSource(sound);

sound.loop = true;

var EffectArray = [];
var runningEffectID = 0;

//--- Effektkette
var effectChain = new EffectChain(context, source);

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

document.getElementById("addEffectButton").addEventListener("click", addEffectButtonFunction);


function updateGUI() {
    document.getElementById("effectPedalWindow").innerHTML = "";
    for (var i=0; i<EffectArray.length; i++){
        EffectArray[i].insertIntoGUI();
    }
}

function updateListeners() {
    for (var i=0; i<EffectArray.length; i++){
        EffectArray[i].addListeners();
    }
}


function addEffectButtonFunction(){
    console.log("Add Effect");
    //Distortion.prototype = new EffectPrototype(context, runningEffectID); 
    Filter.prototype = new EffectPrototype(context, runningEffectID)
    var filter = new Filter(context, runningEffectID);
    //var distortion = new Distortion(context, 1);
//    console.log(distortion.paramID1);
    EffectArray.push(filter);
    effectChain.addEffect(filter);
    runningEffectID++;
    updateGUI();
    updateListeners();
    document.getElementById("addEffectButton").addEventListener("click", addEffectButtonFunction);
}

function removeEffect(effect) {
    var index;
    for (var i=0; i<EffectArray.length; i++){
        console.log(EffectArray[i].effectID);
    }
    index = EffectArray.indexOf(effect);
    //effect = EffectArray[index];
    //delete effect;
    EffectArray.splice(index, 1);
    effectChain.removeEffectAt(index);
    updateGUI(); 
    updateListeners();
    document.getElementById("addEffectButton").addEventListener("click", addEffectButtonFunction);
}