
function Filter() {

    this.setEffectType("Filter");
    var defaultFrequency = 2000;

    var filter = this.audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = defaultFrequency;
    filter.Q.value = 2;
    filter.gain.value = -20;    // not used @ "bandpass"
    
    this.addParameter("Frequency", "Hz", 100, 5000, defaultFrequency, 1, filter.frequency);

    this.getInput().connect(filter);
    filter.connect(this.getWetGain());
}