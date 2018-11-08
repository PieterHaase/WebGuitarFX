var dryGain;
var wetGain;

function Tremolo(thisContext) {
    
    var effectName = 'tremolo';
    var paramName1 = 'tremoloMix';
    var sliderName1 = 'tremoloMixSlider';
    var on = true;

    this.inputGain = thisContext.createGain();
    this.inputGain.gain.value = 1;

    this.gain = thisContext.createGain();
    this.gain.gain.value = 1;

    wetGain = thisContext.createGain();
    wetGain.gain.value = 0.25;

    dryGain = thisContext.createGain();
    dryGain.gain.value = 0.75;

    this.outputGain = thisContext.createGain();
    this.outputGain.gain.value = 1;

    this.inputGain.connect(dryGain);
    this.inputGain.connect(this.gain);
    dryGain.connect(this.outputGain);
    this.gain.connect(wetGain);
    wetGain.connect(this.outputGain);

    this.oscillator = thisContext.createOscillator();
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = 10;
    this.oscillator.connect(this.gain.gain);
    this.oscillator.start(); 
    
    insertTremoloIntoGUI();    

    document.getElementById(sliderName1).addEventListener("input", function() {
        if (on) {
            wetGain.gain.value = this.value/200;
            dryGain.gain.value = 1-(this.value/200);
        }
        document.getElementById(paramName1).innerHTML = "mix: " + this.value + " %";
    });

    document.getElementById("tremoloOnOff").addEventListener("click", function() {
        if (on){
            wetGain.gain.value = 0;
            dryGain.gain.value = 1;
            document.getElementById("tremoloLED").className = "ledOff";
            on = false;
        }
        else {
            wetGain.gain.value = document.getElementById(sliderName1).value/150;
            dryGain.gain.value = 1-(document.getElementById(sliderName1).value/150);
            document.getElementById("tremoloLED").className = "led";
            on = true;
        }
        
    });

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

    Tremolo.prototype.getInput = function() {
        return this.inputGain;
    };
    Tremolo.prototype.getOutput = function() {
        return this.outputGain;
    };
}

