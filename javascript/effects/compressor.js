
function Compressor() {

    this.setEffectType("Compressor");
    var threshold = {value: -50};
    var ratio = {value: 10};
//    var level = {value: -20};

    var compressor = context.createDynamicsCompressor();
    compressor.threshold.value = threshold.value;
    compressor.ratio.value = ratio.value;

    
    this.addParameter("Threshold", "dB", -100, 0, threshold, 1);
    this.addParameter("Ratio", "", 1, 20, ratio, 0.1);
    //this.addParameter("Level", "dB", -40, 40, level, 1);

    this.getInput().connect(compressor);
    compressor.connect(this.getWetGain());

    this.updateParameters = function() {
        compressor.threshold.value = threshold.value;
        compressor.ratio.value = ratio.value;
    }
}