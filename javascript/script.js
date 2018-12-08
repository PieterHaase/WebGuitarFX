var context = new AudioContext();
var sound = new Audio("media/guitar_sample.mp3");
var source = context.createMediaElementSource(sound);
var liveInput;

//--- Effektkette
var effectChain = new EffectChain(context, source);
var inputGain = context.createGain();

navigator.mediaDevices.getUserMedia({ audio: true, video: false})
.then(function(stream) {
//var context = new AudioContext();
liveInput = context.createMediaStreamSource(stream);
liveInput.connect(inputGain);
});

sound.loop = true;

var EffectArray = [];
var runningEffectID = 0;
var isPlaying = false;
var isLive = false;
var mute = false;
var outputGainValue = 1;

var liveButton = document.getElementById("liveButton");
var playButton = document.getElementById("playButton");

liveButton.addEventListener("click", function () {
    liveButton.classList.toggle("glowRed");
    if (isLive) {
        effectChain.updateSource(source);
    } else {
        if (isPlaying){
            playButton.classList.toggle("glowBlue");
            sound.pause();
            isPlaying = false;
        }
        effectChain.updateSource(inputGain);
    }
    isLive = !isLive;
    
});

var inputGainSlider = document.getElementById("inputGain");
var outputGainSlider = document.getElementById("outputGain")

inputGainSlider.addEventListener ('input', function () {
    inputGain.gain.value = this.value;
});
outputGainSlider.addEventListener ('input', function () {
    outputGainValue = this.value;
    if(!mute){
        effectChain.adjustOutputGain(this.value);
    }
});
inputGainSlider.addEventListener ('dblclick', function () {
    inputGain.gain.value = 1;
    inputGainSlider.value = 1;
});
outputGainSlider.addEventListener ('dblclick', function () {
    outputGainSlider.value = 1;
    outputGainValue = 1;
    if(!mute) {
        effectChain.adjustOutputGain(outputGainValue);
    }
});

var muteButton = document.getElementById("muteButton")
muteButton.addEventListener ('click', function() {
    if(!mute){
        effectChain.adjustOutputGain(0);
    } else {
        effectChain.adjustOutputGain(outputGainValue);
    }
    mute = !mute;
    muteButton.classList.toggle("glowGreen");
});

playButton.addEventListener("click", function () {
    playButton.classList.toggle("glowBlue");
    if (isPlaying) {
        sound.pause();
        //playButton.innerHTML = "PLAY";
    } else {
        if (isLive) {
            liveButton.classList.toggle("glowRed");
            isLive =false;
        }
        effectChain.updateSource(source);
        sound.play();
        //playButton.innerHTML = "STOP";
    }
    isPlaying = !isPlaying;
});

document.getElementById("addEffectButton").addEventListener("click", addEffectButtonFunction);




function updateGUI() {
    document.getElementById("effectPedalWindow").innerHTML = "";
    for (var i=0; i<EffectArray.length; i++){
        EffectArray[i].insertIntoGUI();
    }
    document.getElementById("addEffectButton").addEventListener("click", addEffectButtonFunction);
}

function updateListeners() {
    for (var i=0; i<EffectArray.length; i++){
        EffectArray[i].addListeners();
    }
}


function addEffectButtonFunction(){
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("myDropdown").onmouseleave = function(){
        document.getElementById("myDropdown").classList.toggle("show");
    }
    //Distortion.prototype = new EffectPrototype(context, runningEffectID); 
    //Filter.prototype = new EffectPrototype(context, runningEffectID)
//    var filter = new Filter(context, runningEffectID);
    //var distortion = new Distortion(context, 1);
//    console.log(distortion.paramID1);
//    EffectArray.push(filter);
    //effectChain.addEffect(filter);
   /*  Delay.prototype = new EffectPrototype(context, runningEffectID);
    var delay = new Delay(context, runningEffectID);
    EffectArray.push(delay);
    effectChain.addEffect(delay);
 */
}

function dropdownFunction(effectType){
    switch(effectType) {
        case "ParamEQ":
        ParamEQ.prototype = new EffectPrototype(context, runningEffectID)
        var paramEQ = new ParamEQ(context, runningEffectID);    
        EffectArray.push(paramEQ);
        effectChain.addEffect(paramEQ);
        break;
        case "Delay":
        Delay.prototype = new EffectPrototype(context, runningEffectID);
        var delay = new Delay(context, runningEffectID);
        EffectArray.push(delay);
        effectChain.addEffect(delay);
        break;
        case "Distortion":
        Distortion.prototype = new EffectPrototype(context, runningEffectID); 
        var distortion = new Distortion(context, runningEffectID);
        EffectArray.push(distortion);
        effectChain.addEffect(distortion);
        break;
        case "Tremolo":
        Tremolo.prototype = new EffectPrototype(context, runningEffectID); 
        var tremolo = new Tremolo(context, runningEffectID);
        EffectArray.push(tremolo);
        effectChain.addEffect(tremolo);
        break;
        case "Chorus":
        Chorus.prototype = new EffectPrototype(context, runningEffectID); 
        var chorus = new Chorus(context, runningEffectID);
        EffectArray.push(chorus);
        effectChain.addEffect(chorus);
        break;
    }
    document.getElementById("myDropdown").classList.toggle("show");
    runningEffectID++;
    updateGUI();
    updateListeners();
}

function removeEffect(effect) {
    var index;
    index = EffectArray.indexOf(effect);
    EffectArray.splice(index, 1);
    effectChain.removeEffectAt(index);
    updateGUI(); 
    updateListeners();
}

function moveEffectLeft(effect) {
    var index;
    index = EffectArray.indexOf(effect);
    if (index > 0){
        var store = EffectArray[index-1];
        EffectArray[index-1] = EffectArray[index];
        EffectArray[index] = store;
        effectChain.moveEffect(index, index-1);
        updateGUI(); 
        updateListeners();
    }
}

function moveEffectRight(effect) {
    var index;
    index = EffectArray.indexOf(effect);
    if (index < EffectArray.length-1){
        var store = EffectArray[index+1];
        EffectArray[index+1] = EffectArray[index];
        EffectArray[index] = store;
        effectChain.moveEffect(index, index+1);
        updateGUI(); 
        updateListeners();
    }
}