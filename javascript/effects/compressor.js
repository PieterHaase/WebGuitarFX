
function Compressor() {

    // Standardwerte der Effektparameter
    this.setEffectType("Compressor");
    var threshold = {value: -60};
    var ratio = {value: 10};
    var makeUpGain = {value: 6};

    // Compressor Node
    var compressor = context.createDynamicsCompressor();
    compressor.threshold.value = threshold.value;
    compressor.ratio.value = ratio.value;

    // Gain Node um Lautstärkeabschwächung auszugleichen
    var gain = context.createGain();
    gain.gain.value = 1 + makeUpGain.value / 5;
    
    // Hinzufügen der Effektparameter
    this.addParameter("Threshold", "dB", -100, 0, threshold, 1);
    this.addParameter("Ratio", "", 1, 20, ratio, 0.1);
    this.addParameter("Gain", "", 0, 10, makeUpGain, 0.1);

    // Verbinden der Aduio-Nodes
    this.getInput().connect(compressor);
    compressor.connect(gain);
    gain.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {
        compressor.threshold.value = threshold.value;
        compressor.ratio.value = ratio.value;
        gain.gain.value = 1 + makeUpGain.value / 5;
    }
}