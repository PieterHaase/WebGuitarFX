var context = new AudioContext();

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
var activeSampleNr = 0;

var sourceArray = [];
for(var i = 0; i < sampleArray.length; i++) {
    sampleArray[i].loop = true;
    sourceArray[i] = context.createMediaElementSource(sampleArray[i]);
}

var source = sourceArray[0];
var liveInput;

//--- Effektkette
var effectChain = new EffectChain(context, source);
var inputGain = context.createGain();
var analyser = context.createAnalyser();

var constraints = {
    audio: {
      echoCancellation: false,
      noiseSuppression: true,
      autoGainControl: false,
    }
  };
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
//var context = new AudioContext();
liveInput = context.createMediaStreamSource(stream);
liveInput.connect(inputGain);
inputGain.connect(analyser);

visualize();
});

function visualize() {
    var canvas = document.getElementById("inputMeter");
    var canvasCtx = canvas.getContext("2d");
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
 
    analyser.fftSize = 256;
    var bufferLengthAlt = analyser.frequencyBinCount;
    var dataArrayAlt = new Uint8Array(bufferLengthAlt);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    var drawAlt = function() {
        drawVisual = requestAnimationFrame(drawAlt);
        analyser.getByteFrequencyData(dataArrayAlt);
    
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    
        var barWidth;
        var barHeight = HEIGHT;
        var x = 0;
        var maxValue = 0;
    
        for(var i = 0; i < bufferLengthAlt; i++) {
            maxValue = Math.max(maxValue, dataArrayAlt[i]);
        }
        barWidth = WIDTH*(maxValue/256)
        if (isLive){
            canvasCtx.fillStyle = 'rgba(0, 205, 50, 0.7)';
            if(maxValue >= 250){
                canvasCtx.fillStyle = 'rgba(255, 74, 74, 0.7)';
            }
            canvasCtx.fillRect(x,0,barWidth,barHeight);
        }      
    };


/*     var drawAlt = function() {
      drawVisual = requestAnimationFrame(drawAlt);

      analyser.getByteFrequencyData(dataArrayAlt);

      canvasCtx.fillStyle = 'rgb(0, 0, 80)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = WIDTH;
      var barHeight;
      var x = 0;

      for(var i = 0; i < bufferLengthAlt; i++) {
          var maxValue = 50;
        maxValue = Math.max(maxValue, dataArrayAlt[i]);
        barHeight = maxValue;

        
      }
      console.log(maxValue);
      canvasCtx.fillStyle = 'rgb(0,50,0)';
        canvasCtx.fillRect(x,HEIGHT,barWidth,barHeight);
    }; */

    drawAlt();
}

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
            sampleArray[activeSampleNr].pause();
            isPlaying = false;
        }
        effectChain.updateSource(inputGain);
    }
    isLive = !isLive;
    
});

var inputGainSlider = document.getElementById("inputGain");
var outputGainSlider = document.getElementById("outputGain")

inputGainSlider.addEventListener ('input', function () {
    var value = this.value;
    if(value >= 0.9 && value <= 1.1){
        value = 1;
        inputGainSlider.value = 1;
    }
    inputGain.gain.value = value;
});
outputGainSlider.addEventListener ('input', function () {
    var value = this.value;
    if(value >= 0.9 && value <= 1.1){
        value = 1;
        outputGainSlider.value = 1;
    }
    outputGainValue = value;
    if(!mute){
        effectChain.adjustOutputGain(value);
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

var sampleSelector = document.getElementById("sampleSelector");
sampleSelector.addEventListener("change", function(){
    if (isPlaying) {
        playButton.classList.toggle("glowBlue");
        isPlaying = !isPlaying;
        sampleArray[activeSampleNr].pause();
    }
    var selection = sampleSelector.selectedIndex;
    activeSampleNr = selection;
    //source = sourceArray[selection];
    //effectChain.updateSource(source);
});

playButton.addEventListener("click", function () {
    playButton.classList.toggle("glowBlue");
    if (isPlaying) {
        sampleArray[activeSampleNr].pause();
        //sampleArray[activeSampleNr].fastSeek(0);
        //playButton.innerHTML = "PLAY";
    } else {
        if (isLive) {
            liveButton.classList.toggle("glowRed");
            isLive =false;
        }
        source = sourceArray[activeSampleNr];
        effectChain.updateSource(source);
        sampleArray[activeSampleNr].play();
        console.log("Playing: " + activeSampleNr);
        //playButton.innerHTML = "STOP";
    }
    isPlaying = !isPlaying;
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