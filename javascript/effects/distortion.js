
function Distortion(audioContext, id) {
    //this.constructor(audioContext, id)
    this.setEffectType("Distortion");
    var gain = {value: 1.3};
    var tone = {value: 5.3};
    var treble = {value: 2.4};

    var inputGain = this.audioContext.createGain();
    inputGain.gain.value = 0.5;
    this.addNode(inputGain);

    var filter1 = this.audioContext.createBiquadFilter();
    filter1.type = "peaking";
    filter1.frequency.value = 550 + tone.value * 20;
    filter1.Q.value = 1;
    filter1.gain.value = 15;
    this.addNode(filter1);

    var filter2 = this.audioContext.createBiquadFilter();
    filter2.type = "peaking";
    filter2.frequency.value = 3004;
    filter2.Q.value = 1.1;
    filter2.gain.value = 9;
    this.addNode(filter2);

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
      
    distortion.curve = makeDistortionCurve(gain.value*200);
    distortion.oversample = '4x';

    var filter3 = this.audioContext.createBiquadFilter();
    filter3.type = "peaking";
    filter3.frequency.value = 7579;
    filter3.Q.value = 2.8;
    filter3.gain.value = treble.value - 20;
    this.addNode(filter3);

    this.addParameter("Gain", "", 0, 10, gain, .1);
    this.addParameter("Tone", "", 0, 10, tone, .1);
    this.addParameter("Treble", "", 0, 10, treble, .1);

    this.updateParameters = function(){
        distortion.curve = makeDistortionCurve(gain.value*200);
        filter1.frequency.value = 550 + tone.value * 20;
        filter3.gain.value = treble.value - 20;
    }

    this.addNode(distortion);

    this.getInput().connect(inputGain);
    inputGain.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(distortion);
    distortion.connect(filter3);
    filter3.connect(this.getWetGain());
}