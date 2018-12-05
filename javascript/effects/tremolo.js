
function Tremolo(thisContext) {
    this.setEffectType("Tremolo");
    var rate = {value: 4};
    var depth = {value: 6};

    var gain = thisContext.createGain();
    gain.gain.value = 1;

    var dryMix = thisContext.createGain();
    dryMix.gain.value = 1-depth.value/10;

    var wetMix = thisContext.createGain();
    wetMix.gain.value = depth.value/10-0.1;

    var oscillator = thisContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = rate.value*2;
    oscillator.connect(gain.gain);
    oscillator.start(); 
    this.addNode(gain);
    
    this.addParameter("Rate", "", 0, 10, rate, 0.1);
    this.addParameter("Depth", "", 0, 10, depth, 0.1);

    this.getInput().connect(dryMix);
    dryMix.connect(this.getWetGain());
    this.getInput().connect(gain);
    gain.connect(wetMix)
    wetMix.connect(this.getWetGain());

    this.updateParameters = function() {
        dryMix.gain.value = 1-depth.value/10;
        wetMix.gain.value = depth.value/10-0.1;
        oscillator.frequency.value = rate.value*2;
    }
}
   