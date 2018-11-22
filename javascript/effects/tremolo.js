
function Tremolo(thisContext) {
    this.setEffectType("Tremolo");
    var frequency = {value: 10};
    var mix = {value: 40};

    var gain = thisContext.createGain();
    gain.gain.value = 1;

    var dryMix = thisContext.createGain();
    dryMix.gain.value = 1-mix.value/100;

    var wetMix = thisContext.createGain();
    wetMix.gain.value = mix.value/100;

    var oscillator = thisContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency.value;
    oscillator.connect(gain.gain);
    oscillator.start(); 
    this.addNode(gain);
    
    this.addParameter("Mix", "%", 0, 100, mix, 1);

    this.getInput().connect(dryMix);
    dryMix.connect(this.getWetGain());
    this.getInput().connect(gain);
    gain.connect(wetMix)
    wetMix.connect(this.getWetGain());

    this.updateParameters = function() {
        dryMix.gain.value = 1-mix.value/100;
        wetMix.gain.value = mix.value/100;
    }
}
   