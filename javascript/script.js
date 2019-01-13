
var EffectArray = [];       // speichert die Reihenfolge der Effekte für die GUI
var runningEffectID = 0;
var isPlaying = false;
var isLive = false;
var mute = false;
var outputGainValue = 1;

// AudioContext erzeugen und starten
var context = new AudioContext();


// Gitarren-Samples
var activeSampleNr = 0;
var sourceArray = [];
var sampleArray = [];
sampleArray[0] = new Audio("media/ballad_1.mp3");
sampleArray[1] = new Audio("media/ballad_2.mp3");
sampleArray[2] = new Audio("media/rock_1.mp3");
sampleArray[3] = new Audio("media/rock_2.mp3");
sampleArray[4] = new Audio("media/rock_3.mp3");
sampleArray[5] = new Audio("media/metal_1.mp3");
sampleArray[6] = new Audio("media/metal_2.mp3");
sampleArray[7] = new Audio("media/solo_1.mp3");
sampleArray[8] = new Audio("media/solo_2.mp3");

for(var i = 0; i < sampleArray.length; i++) {
    sampleArray[i].loop = true;
    sourceArray[i] = context.createMediaElementSource(sampleArray[i]);
}
var source = sourceArray[0];


// Erstellen der Effektkette
var effectChain = new EffectChain(context, source);


// Live-Input
var inputGain = context.createGain();
var analyser = context.createAnalyser();
var liveInput;
var constraints = {
    audio: {
      echoCancellation: false,
      noiseSuppression: true,
      autoGainControl: false,
    }
};
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
liveInput = context.createMediaStreamSource(stream);
liveInput.connect(inputGain);
inputGain.connect(analyser);
visualize();
});


// Hinzufügen der Listener für die GUI Buttons
addGUIListeners(context);


// Hinzufügen der Effekte zur GUI nach Änderungen an der Effektkette
function updateGUI() {
    document.getElementById("effectPedalWindow").innerHTML = "";
    for (var i=0; i<EffectArray.length; i++){
        insertEffectIntoGUI(EffectArray[i]);
    }
    for (var i=0; i<EffectArray.length; i++){
        addEffectListeners(EffectArray[i]);
    }
}


// Hinzufügen neuer Effekte abhängig vom gewählten Effekttypen
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
        case "Flanger":
        Flanger.prototype = new EffectPrototype(context, runningEffectID); 
        var flanger = new Flanger(context, runningEffectID);
        EffectArray.push(flanger);
        effectChain.addEffect(flanger);
        break;
        case "Compressor":
        Compressor.prototype = new EffectPrototype(context, runningEffectID); 
        var compressor = new Compressor(context, runningEffectID);
        EffectArray.push(compressor);
        effectChain.addEffect(compressor);
        break;
        case "Vibrato":
        Vibrato.prototype = new EffectPrototype(context, runningEffectID); 
        var vibrato = new Vibrato(context, runningEffectID);
        EffectArray.push(vibrato);
        effectChain.addEffect(vibrato);
        break;
        case "ThreeBandEQ":
        ThreeBandEQ.prototype = new EffectPrototype(context, runningEffectID); 
        var threeBandEQ = new ThreeBandEQ(context, runningEffectID);
        EffectArray.push(threeBandEQ);
        effectChain.addEffect(threeBandEQ);
        break;
    }
    document.getElementById("myDropdown").classList.toggle("show");
    runningEffectID++;
    updateGUI();
}


// Entfernen der Effekte aus der Effektkette
function removeEffect(effect) {
    var index;
    index = EffectArray.indexOf(effect);
    EffectArray.splice(index, 1);
    effectChain.removeEffectAt(index);
    updateGUI(); 
}

// Bewegen der Effekte innerhalb der Effektkette nach links
function moveEffectLeft(effect) {
    var index;
    index = EffectArray.indexOf(effect);
    if (index > 0){
        var store = EffectArray[index-1];
        EffectArray[index-1] = EffectArray[index];
        EffectArray[index] = store;
        effectChain.moveEffect(index, index-1);
        updateGUI();
    }
}

// Bewegen der Effekte innerhalb der Effektkette nach rechts
function moveEffectRight(effect) {
    var index;
    index = EffectArray.indexOf(effect);
    if (index < EffectArray.length-1){
        var store = EffectArray[index+1];
        EffectArray[index+1] = EffectArray[index];
        EffectArray[index] = store;
        effectChain.moveEffect(index, index+1);
        updateGUI(); 
    }
}