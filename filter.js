var dryGain;
var wetGain;
var effectName;
var paramID1;
var sliderID1;

var filter;

function Filter(thisContext) {

    var on = true;

    this.effectName = 'filter';
    effectName = this.effectName;
    this.paramID1 = 'filterFrequency';
    paramID1 = this.paramID1;
    this.paramUnit1 = 'Hz';
    this.paramMin1 = 100;
    this.paramMax1 = 5000;
    this.paramValue1 = 2500;
    this.sliderID1 = 'filterFrequencySlider';
    sliderID1 = this.sliderID1;

    this.inputGain = thisContext.createGain();
    this.inputGain.gain.value = 1;

    this.outputGain = thisContext.createGain();
    this.outputGain.gain.value = 1;

    dryGain = thisContext.createGain();
    dryGain.gain.value = 0;
    this.dryGain = dryGain;

    wetGain = thisContext.createGain();
    wetGain.gain.value = 1.6;
    this.wetGain = wetGain;

    filter = thisContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2500;
    filter.Q.value = 2;
    filter.gain.value = -20;

    this.inputGain.connect(dryGain);
    this.inputGain.connect(filter);
    filter.connect(wetGain);
    dryGain.connect(this.outputGain);
    wetGain.connect(this.outputGain);

    //insertIntoGUI(this);
    //addListeners(this);

    function slider1Function() {
        if (on) {
            filter.frequency.value = this.value;
        }
        document.getElementById(paramID1).innerHTML = "frequency: " + this.value + " Hz";
    }

    function onOffButtonFunction() {
        if (on){
            wetGain.gain.value = 0;
            dryGain.gain.value = 1;
            document.getElementById(effectName + 'LED').className = "ledOff";
            on = false;
        }
        else {
            wetGain.gain.value = 1.6;
            dryGain.gain.value = 0;
            document.getElementById(effectName + 'LED').className = "led";
            on = true;
        }
    }

    //insertFilterIntoGUI();
/*
    document.getElementById(sliderID1).addEventListener("input", function() {
        filter.frequency.value = this.value;
        document.getElementById(paramID1).innerHTML = "frequency: " + this.value + " Hz";
    });

    document.getElementById(effectName + "OnOff").addEventListener("click", function() {
        if (on){
            wetGain.gain.value = 0;
            dryGain.gain.value = 1;
            document.getElementById(effectName + "LED").className = "ledOff";
            on = false;
        }
        else {
            wetGain.gain.value = 1.6;
            dryGain.gain.value = 0;
            document.getElementById(effectName + "LED").className = "led";
            on = true;
        }
        
    });

    console.log("Tremolo Listener added");
/*
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
    */
    /*
    function insertFilterIntoGUI() {   
        var string = 
        '   <div class="effectContainer">' +
        '      <div class="effectPedal" id="' + effectName + '">' +
        '          <div class="frontPanel">' +
        '          <div class="effectTitle">' + effectName + '</div>' +
        '          <div class="paramName1" id="' + paramName1 + '">frequency: 2500 Hz</div>' +
        '              <input class="paramSlider1" id="' + sliderName1 + '" type="range" min="10" max="5000" value="2500">' +
        '           </div>' +
        '          <div class="led" id="filterLED"></div>' +
        '          <div class="onOffButtonRing">' +
        '              <div class="onOffButton" id="filterOnOff"></div>' +
        '          </div>' +
        '      </div>' +
        '   </div>';
        document.getElementById("effectPedalWindow").innerHTML += string;
    }    
    */   

    Filter.prototype.getInput = function() {
        return this.inputGain;
    };

    Filter.prototype.getOutput = function() {
        return this.outputGain;
    };

    Filter.prototype.addListeners = function() {
        document.getElementById(sliderID1).addEventListener("input", slider1Function);
        document.getElementById(this.effectName + 'OnOff').addEventListener("click", onOffButtonFunction);
    };
}