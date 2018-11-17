//var dryGain;
//var wetGain;
//var paramID1;
//var sliderID1;

function Tremolo(thisContext) {
    var effectName = 'tremolo';
    this.effectName = effectName;
    this.paramID1 = 'tremoloMix';
    var paramID1 = this.paramID1;
    this.paramUnit1 = '%';
    this.paramMin1 = 0;
    this.paramMax1 = 100;
    this.paramValue1 = 50;
    this.sliderID1 = 'tremoloMixSlider';
    var sliderID1 = this.sliderID1;

    var on = true;

    var inputGain = thisContext.createGain();
    inputGain.gain.value = 1;

    var gain = thisContext.createGain();
    gain.gain.value = 1;

    var dryGain = thisContext.createGain();
    dryGain.gain.value = 0.75;
 //   this.dryGain = dryGain;

    var wetGain = thisContext.createGain();
    wetGain.gain.value = 0.25;
 //   this.wetGain = wetGain;

    var outputGain = thisContext.createGain();
    outputGain.gain.value = 1;

    inputGain.connect(dryGain);
    inputGain.connect(gain);
    dryGain.connect(outputGain);
    gain.connect(wetGain);
    wetGain.connect(outputGain);

    var oscillator = thisContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 10;
    oscillator.connect(gain.gain);
    oscillator.start(); 
    
    //insertTremoloIntoGUI();    
    //insertIntoGUI(this);
    //document.getElementById(this.sliderID1).addEventListener("input", slider1Function);
    //    addListeners(this);

    function slider1Function() {
        if (on) {
            wetGain.gain.value = document.getElementById(sliderID1).value/200;
            dryGain.gain.value = 1-(wetGain.gain.value);
        }
        document.getElementById(paramID1).innerHTML = "mix: " + this.value + " %";
        //console.log("Tremolo Listener added");
    }

    function onOffButtonFunction() {
        if (on){
            wetGain.gain.value = 0;
            dryGain.gain.value = 1;
            document.getElementById(effectName + 'LED').className = "ledOff";
            on = false;
        }
        else {
            wetGain.gain.value = document.getElementById(sliderID1).value/150;
            dryGain.gain.value = 1-(wetGain.gain.value);
            document.getElementById(effectName + 'LED').className = "led";
            on = true;
        }
    }

    function xButtonFunction() {
        console.log("Remove");
        removeEffect(this);
    }
/*
    document.getElementById(this.sliderID1).addEventListener("input", function() {
        if (on) {
            wetGain.gain.value = this.value/200;
            dryGain.gain.value = 1-(wetGain.gain.value);
        }
        document.getElementById(paramID1).innerHTML = "mix: " + this.value + " %";
        //console.log("Tremolo Listener added");
        document.getElementById(this.sliderID1).addEventListener("input", this);
    });

    document.getElementById("tremoloOnOff").addEventListener("click", function() {
        if (on){
            wetGain.gain.value = 0;
            dryGain.gain.value = 1;
            document.getElementById("tremoloLED").className = "ledOff";
            on = false;
        }
        else {
            wetGain.gain.value = document.getElementById(sliderID1).value/150;
            dryGain.gain.value = 1-(wetGain.gain.value);
            document.getElementById("tremoloLED").className = "led";
            on = true;
        }
        //console.log("Tremolo On Off Listener added");
    });
*/
    

    Tremolo.prototype.getInput = function() {
        return inputGain;
    };
    Tremolo.prototype.getOutput = function() {
        return outputGain;
    };

    Tremolo.prototype.addListeners = function() {
        document.getElementById(this.sliderID1).addEventListener("input", slider1Function);
        document.getElementById(this.effectName + 'OnOff').addEventListener("click", onOffButtonFunction);
        document.getElementById(this.effectName + 'XButton').addEventListener("click", xButtonFunction);
    };

}
/*
function insertTremoloIntoGUI() {   
    var string = 
    '   <div class="effectContainer">' +
    '      <div class="effectPedal" id="' + effectName + '">' +
    '          <div class="frontPanel">' +
    '          <div class="effectTitle">' + effectName + '</div>' +
    '          <div class="paramName1" id="' + paramName1 + '">mix: 50%</div>' +
    '              <input class="paramSlider1" id="' + sliderName1 + '" type="range" min="0" max="100" value="50">' +
    '           </div>' +
    '          <div class="led" id="tremoloLED"></div>' +
    '          <div class="onOffButtonRing">' +
    '              <div class="onOffButton" id="tremoloOnOff"></div>' +
    '          </div>' +
    '      </div>' +
    '   </div>';
    document.getElementById("effectPedalWindow").innerHTML += string;
}
*/