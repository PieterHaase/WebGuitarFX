
function Filter() {

    this.setEffectType("Filter");
    var frequency = {value: 2000};

    var filter = this.audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = frequency.value;
    filter.Q.value = 2;
    filter.gain.value = -20;    // not used @ "bandpass"
    this.addNode(filter);
    
    this.addParameter("Frequency", "Hz", 100, 5000, frequency, 1);

    this.getInput().connect(filter);
    filter.connect(this.getWetGain());

    this.updateParameters = function() {
        filter.frequency.value = frequency.value;
    }
}