var context = new AudioContext();
var sound = new Audio("guitar_sample.mp3");
var source = context.createMediaElementSource(sound);
var effectCount = 0;

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

document.getElementById("addEffectButton").addEventListener("click", addEffectButtonFunction);
/*
document.getElementById("addEffectButton").addEventListener("click", function () {
    switch(effectCount) {
        case 0:
            var tremolo = new Tremolo(context);
            effectChain.addEffect(tremolo);
            break;
        case 1:
            var filter = new Filter(context);
            effectChain.addEffect(filter);
            break;
        case 2:
            var delay = new Delay(context);
            effectChain.addEffect(delay);
        default:
    }
    effectCount++;
    console.log("CLICK!");
*/    
//    document.getElementById(tremolo.sliderID1).addEventListener("input", tremolo.slider1Function(document.getElementById(tremolo.sliderID1.value)));
    //var filter = new Filter(context);
    //effectChain.addEffect(filter);

    var EffectArray = [];

function addEffectButtonFunction(){
    switch(effectCount) {
        case 0:
            var tremolo = new Tremolo(context);
            EffectArray.push(tremolo);
            effectChain.addEffect(tremolo);
            break;
        case 1:
            var filter = new Filter(context);
            EffectArray.push(filter);
            effectChain.addEffect(filter);
            break;
        case 2:
            var delay = new Delay(context);
            EffectArray.push(delay);
            effectChain.addEffect(delay);
        default:
    }
    effectCount++;
    console.log("CLICK!");
    for (var i=0; i<EffectArray.length; i++){
        EffectArray[i].addListeners();
    }
    document.getElementById("addEffectButton").addEventListener("click", addEffectButtonFunction);
}


function insertIntoGUI(effect) {   
    var effectName = effect.effectName
    var paramID1 = effect.paramID1;
    var paramUnit1 = effect.paramUnit1;
    var paramMin1 = effect.paramMin1;
    var paramMax1 = effect.paramMax1;
    var paramValue1 = effect.paramValue1;
    var sliderID1 = effect.sliderID1;
    var string = 
    '   <div class="effectContainer">' +
    '      <div class="effectPedal" id="' + effectName + '">' +
    '          <div class="frontPanel">' +
    '          <div class="effectTitle">' + effectName + '</div>' +
    '          <div class="paramName1" id="' + paramID1 + '">' + paramID1 + ': ' + paramValue1 + paramUnit1 + '</div>' +
    '              <input class="paramSlider1" id="' + sliderID1 + '" type="range" min="' + paramMin1 + '" max="' + paramMax1 + '" value="' + paramValue1 + '">' +
    '           </div>' +
    '          <div class="led" id="' + effectName + 'LED"></div>' +
    '          <div class="onOffButtonRing">' +
    '              <div class="onOffButton" id="' + effectName + 'OnOff"></div>' +
    '          </div>' +
    '      </div>' +
    '   </div>';
    document.getElementById("effectPedalWindow").innerHTML += string;
}

function addListeners(effect) {
    var sliderID1 = effect.sliderID1;
    var paramID1 = effect.paramID1;
    var paramUnit1 = effect.paramUnit1;
    var effectName = effect.effectName;
    var dryGain = effect.dryGain;
    var wetGain = effect.wetGain;
    
    
    document.getElementById(sliderID1).addEventListener("input", function() {
        if (effect.on) {
            wetGain.gain.value = this.value/200;
            dryGain.gain.value = 1-(wetGain.gain.value);
        }
        document.getElementById(paramID1).innerHTML = paramID1 + ' ' + this.value + paramUnit1; ;
    });

    document.getElementById(effectName + "OnOff").addEventListener("click", function() {
        if (effect.on){
            wetGain.gain.value = 0;
            dryGain.gain.value = 1;
            document.getElementById(effectName + "LED").className = "ledOff";
            effect.on = false;
        }
        else {
            wetGain.gain.value = document.getElementById(sliderID1).value/150;
            dryGain.gain.value = 1-(wetGain.gain.value);
            document.getElementById(effectName + "LED").className = "led";
            effect.on = true;
        }
        
    });

}