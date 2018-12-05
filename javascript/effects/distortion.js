
function Distortion(audioContext, id) {
    //this.constructor(audioContext, id)
    this.setEffectType("Distortion");
    var amount = {value: 6};

    this.addParameter("Gain", "", 0, 10, amount, .1);

    var distortion = audioContext.createWaveShaper();
    function makeDistortionCurve(dist_amount) {
        var k = dist_amount,
          n_samples = 44100,
          curve = new Float32Array(n_samples),
          deg = Math.PI / 180,
          i = 0,
          x;
        for ( ; i < n_samples; ++i ) {
          x = i * 2 / n_samples - 1;
          curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        }
        return curve;
      };
      
    distortion.curve = makeDistortionCurve(amount.value*10);
    distortion.oversample = '4x';

    this.updateParameters = function(){
        distortion.curve = makeDistortionCurve(amount.value*10);
    }

    this.addNode(distortion);

    this.getInput().connect(distortion);
    distortion.connect(this.getWetGain());
}