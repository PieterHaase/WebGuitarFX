
function Distortion(audioContext, id) {

  // Standardwerte der Effektparameter
    this.setEffectType("Distortion");
    var gain = {value: 1.3};
    var tone = {value: 5.3};
    var presence = {value: 2.4};

    // Herabsetzen der Lautstärke, da verzerrte Signale lauter erscheinen
    var inputGain = this.audioContext.createGain();
    inputGain.gain.value = 0.5;

    // Filter zur formen des Verzerrungscharakters
    var filter1 = this.audioContext.createBiquadFilter();
    filter1.type = "peaking";
    filter1.frequency.value = 550 + tone.value * 20;
    filter1.Q.value = 1;
    filter1.gain.value = 15;
    var filter2 = this.audioContext.createBiquadFilter();
    filter2.type = "peaking";
    filter2.frequency.value = 3004;
    filter2.Q.value = 1.1;
    filter2.gain.value = 9;

    // Distortion Algorithmus
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

    // Filter zur Klangformung
    var filter3 = this.audioContext.createBiquadFilter();
    filter3.type = "peaking";
    filter3.frequency.value = 7579;
    filter3.Q.value = 2.8;
    filter3.gain.value = presence.value - 20;
    var filter4 = this.audioContext.createBiquadFilter();
    filter4.type = "peaking";
    filter4.frequency.value = 680;
    filter4.Q.value = 2;
    filter4.gain.value = -6;
    var filter5 = this.audioContext.createBiquadFilter();
    filter5.type = "peaking";
    filter5.frequency.value = 10000;
    filter5.Q.value = 1.2;
    filter5.gain.value = -3;

    // Lautstärkeausgleich bei niedriger Verzerrung
    var outputGain = this.audioContext.createGain();
    outputGain.gain.value = 1 - 0.5 * Math.min(gain.value, 1);

    // Hinzufügen der Effektparameter
    this.addParameter("Gain", "", 0, 10, gain, .1);
    this.addParameter("Tone", "", 0, 10, tone, .1);
    this.addParameter("Presence", "", 0, 10, presence, .1);

    // Verbinden der Aduio-Nodes
    this.getInput().connect(inputGain);
    inputGain.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(distortion);
    distortion.connect(filter3);
    filter3.connect(filter4);
    filter4.connect(filter5);
    filter5.connect(outputGain);
    outputGain.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function(){
      distortion.curve = makeDistortionCurve(gain.value*200);
      outputGain.gain.value = 1 - 0.5 * Math.min(gain.value, 1);
      filter1.frequency.value = 550 + tone.value * 20;
      filter3.gain.value = presence.value - 20;
  }
}