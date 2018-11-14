

function Delay(thisContext) {
    var delay1;
    var delay2;
    var dryGain;
    var wetGain;
    var delayTime = 0.2;
    var feedback = 0.4;
    this.effectName = 'delay';
    var effectName = this.effectName;
    
    this.paramID1 = 'delayTime';
    var paramID1 = this.paramID1;
    this.paramUnit1 = 'ms';
    this.paramMin1 = 0;
    this.paramMax1 = 1000;
    this.paramValue1 = delayTime*1000;
    this.sliderID1 = 'delayTimeSlider';
    var sliderID1 = this.sliderID1;

    var on = true;

    this.inputGain = thisContext.createGain();
    this.inputGain.gain.value = 1;

    this.outputGain = thisContext.createGain();
    this.outputGain.gain.value = 1;

    dryGain = thisContext.createGain();
    dryGain.gain.value = 1;
    
    wetGain = thisContext.createGain();
    wetGain.gain.value = 0.75;

    delay1 = thisContext.createDelay(1);
    delay1.delayTime.value = delayTime;
    var delay1Gain = thisContext.createGain();
    delay1Gain.gain.value = 0.5;

    delay2 = thisContext.createDelay(1);
    delay2.delayTime.value = delayTime;
    var delay2Gain = thisContext.createGain();
    delay2Gain.gain.value = 0.5 * feedback;

    delay3 = thisContext.createDelay(1);
    delay3.delayTime.value = delayTime;
    var delay3Gain = thisContext.createGain();
    delay3Gain.gain.value = 0.5 * feedback;

    this.inputGain.connect(dryGain);
    dryGain.connect(this.outputGain);
    this.inputGain.connect(delay1);
    delay1.connect(delay1Gain);
    delay1Gain.connect(wetGain);
    delay1Gain.connect(delay2);
    delay2.connect(delay2Gain);
    delay2Gain.connect(wetGain);
    delay2Gain.connect(delay3);
    delay3.connect(delay3Gain);
    delay3Gain.connect(wetGain);
    wetGain.connect(this.outputGain);

    //insertIntoGUI(this);

    function slider1Function() {
        delayTime = document.getElementById(sliderID1).value/1000;
        if (on) {
            delay1.delayTime.value = delayTime;
            delay2.delayTime.value = delayTime;
            delay3.delayTime.value = delayTime;
        }
        document.getElementById(paramID1).innerHTML = "time: " + delayTime*1000 + " ms";
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
            wetGain.gain.value = 0.25;
            dryGain.gain.value = 0.75;
            document.getElementById(effectName + 'LED').className = "led";
            on = true;
        }
    }

    Delay.prototype.getInput = function() {
        return this.inputGain;
    };
    Delay.prototype.getOutput = function() {
        return this.outputGain;
    };
    Delay.prototype.addListeners = function() {
        document.getElementById(sliderID1).addEventListener("input", slider1Function);
        document.getElementById(effectName + 'OnOff').addEventListener("click", onOffButtonFunction);
    }
}
