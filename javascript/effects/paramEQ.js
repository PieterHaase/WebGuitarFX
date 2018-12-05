
function ParamEQ() {

    this.setEffectType("ParamEQ");
    var frequency = {value: 2000};
    var qFactor = {value: 4};
    var level = {value: -20};

    var filter = this.audioContext.createBiquadFilter();
    filter.type = "peaking";
    filter.frequency.value = frequency.value;
    filter.Q.value = qFactor.value;
    filter.gain.value = level.value;
    this.addNode(filter);
    
    this.addParameter("Frequency", "Hz", 100, 10000, frequency, 1);
    this.addParameter("Q", "", 1, 8, qFactor, 0.1);
    this.addParameter("Level", "dB", -40, 40, level, 1);

    this.getInput().connect(filter);
    filter.connect(this.getWetGain());

    this.updateParameters = function() {
        filter.frequency.value = frequency.value;
        filter.Q.value = qFactor.value;
        filter.gain.value = level.value;
    }
}