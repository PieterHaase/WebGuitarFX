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
        case "Filter":
        Filter.prototype = new EffectPrototype(context, runningEffectID)
        var filter = new Filter(context, runningEffectID);    
        EffectArray.push(filter);
        effectChain.addEffect(filter);
        break;
        case "Delay":
        Delay.prototype = new EffectPrototype(context, runningEffectID);
        var delay = new Delay(context, runningEffectID);
        EffectArray.push(delay);
        effectChain.addEffect(delay);
        break;
        case "Distortion":
        Distortion.prototype = new EffectPrototype(context, runningEffectID); 
        var distortion = new Distortion(context, 1);
        EffectArray.push(distortion);
        effectChain.addEffect(distortion);
        break;
        case "Tremolo":
        Tremolo.prototype = new EffectPrototype(context, runningEffectID); 
        var tremolo = new Tremolo(context, 1);
        EffectArray.push(tremolo);
        effectChain.addEffect(tremolo);
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