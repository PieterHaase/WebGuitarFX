
function Compressor() {

    this.setEffectType("Compressor");
    var threshold = {value: -60};
    var ratio = {value: 10};
    var makeUpGain = {value: 6};

    var compressor = context.createDynamicsCompressor();
    compressor.threshold.value = threshold.value;
    compressor.ratio.value = ratio.value;

    var gain = context.createGain();
    gain.gain.value = 1 + makeUpGain.value / 5;
    
    this.addParameter("Threshold", "dB", -100, 0, threshold, 1);
    this.addParameter("Ratio", "", 1, 20, ratio, 0.1);
    this.addParameter("Gain", "", 0, 10, makeUpGain, 0.1);

    this.getInput().connect(compressor);
    compressor.connect(gain);
    gain.connect(this.getWetGain());

    this.updateParameters = function() {
        compressor.threshold.value = threshold.value;
        compressor.ratio.value = ratio.value;
        gain.gain.value = 1 + makeUpGain.value / 5;
    }
}