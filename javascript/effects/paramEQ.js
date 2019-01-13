
function ParamEQ() {

    // Standardwerte der Effektparameter
    this.setEffectType("ParamEQ");
    var frequency = {value: 2000};
    var qFactor = {value: 4};
    var level = {value: -20};

    // Filter-Node
    var filter = this.audioContext.createBiquadFilter();
    filter.type = "peaking";
    filter.frequency.value = frequency.value;
    filter.Q.value = qFactor.value;
    filter.gain.value = level.value;
    
    // Hinzufügen der Effektparameter
    this.addParameter("Frequency", "Hz", 100, 10000, frequency, 1);
    this.addParameter("Q", "", 1, 8, qFactor, 0.1);
    this.addParameter("Level", "dB", -40, 40, level, 1);

    // Verbinden der Audio-Nodes
    this.getInput().connect(filter);
    filter.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {
        filter.frequency.value = frequency.value;
        filter.Q.value = qFactor.value;
        filter.gain.value = level.value;
    }
}