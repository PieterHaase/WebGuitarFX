EffectPrototype2 = function(audioContext, id) {
    this.init(audioContext, id);
}
EffectPrototype2.prototype.init = function(audioContext, id) {
//    this.audioContext = audioContext;
    this.id = id;
    this.effectName;
    this.effectType;

    this.param1ID;
    this.param1Unit;
    this.param1Min;
    this.param1Max;
    this.param1Default;
    this.slider1ID;

    var on = true;

    var inputGain = audioContext.createGain();
    inputGain.gain.value = 1;
    var outputGain = this.audioContext.createGain();
    outputGain.gain.value = 1;

    var dryGain = this.audioContext.createGain();
    dryGain.gain.value = 0;
    this.wetGain = this.audioContext.createGain();
    this.wetGain.gain.value = 1;

    inputGain.connect(dryGain);
    dryGain.connect(outputGain);
    this.wetGain.connect(outputGain);

    var slider1Function = function() {
        
    }

    var onOffButtonFunction = function() {
        if (on){
            this.wetGain.gain.value = 0;
            dryGain.gain.value = 1;
            document.getElementById(this.effectName + 'LED').className = "ledOff";
            on = false;
        }
        else {
            this.wetGain.gain.value = 1;
            dryGain.gain.value = 0;
            document.getElementById(this.effectName + 'LED').className = "led";
            on = true;
        }
    }

    var xButtonFunction = function() {
        removeEffect(this);
    }

    this.setDefinition = function(id, effectType) {
        this.id = id;
        this.effectName = effectType + id;
        this.effectType = effectType;
    }

    this.setParam1 = function(param1Name, param1Unit, param1Min, param1Max, param1Default) {
        this.param1ID = this.effectName + param1Name;
        this.param1Unit = param1Unit;
        this.param1Min = param1Min;
        this.param1Max = param1Max;
        this.param1Default = param1Default;
        this.slider1ID = this.effectName + "slider1";
    }

    this.getInput = function() {
        return inputGain;
    };
    this.getOutput = function() {
        return outputGain;
    };
    this.addListeners = function() {
        document.getElementById(this.slider1ID).addEventListener("input", slider1Function);
        document.getElementById(this.effectName + 'OnOff').addEventListener("click", onOffButtonFunction);
        document.getElementById(this.effectName + 'XButton').addEventListener("click", xButtonFunction);
    }  
}