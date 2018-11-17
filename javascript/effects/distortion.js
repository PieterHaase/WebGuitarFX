
function Distortion(audioContext, id) {
    //this.constructor(audioContext, id)
    this.setEffectType("Distortion");

    var distortion = audioContext.createWaveShaper();
    function makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
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
      
    distortion.curve = makeDistortionCurve(400);
    distortion.oversample = '4x';

    this.addParameter("Gain", "", 0, 10, 5, .1);

    this.getInput().connect(distortion);
    distortion.connect(this.getWetGain());
}