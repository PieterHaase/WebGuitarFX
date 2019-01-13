
function Tremolo(thisContext) {

    // Standardwerte der Effektparameter
    this.setEffectType("Tremolo");
    var rate = {value: 4};
    var depth = {value: 6};

    // Gain-Node für die Änderung der Lautstärke
    var gain = thisContext.createGain();
    gain.gain.value = 1;

    // Gain-Nodes für das Mischungsverhältnis von Original- und moduliertem Signal
    var dryMix = thisContext.createGain();
    dryMix.gain.value = 1-depth.value/10;
    var wetMix = thisContext.createGain();
    wetMix.gain.value = depth.value/10-0.1;

    // Oszillator für die periodische Änderung der Gain-Node
    var oscillator = thisContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = rate.value*2;
    oscillator.connect(gain.gain);
    oscillator.start(); 
    
    // Hinzufügen der Effektparameter
    this.addParameter("Rate", "", 0, 10, rate, 0.1);
    this.addParameter("Depth", "", 0, 10, depth, 0.1);

    // Verbinden der Audio-Nodes
    this.getInput().connect(dryMix);
    dryMix.connect(this.getWetGain());
    this.getInput().connect(gain);
    gain.connect(wetMix)
    wetMix.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {
        dryMix.gain.value = 1-depth.value/10;
        wetMix.gain.value = depth.value/10-0.1;
        oscillator.frequency.value = rate.value*2;
    }
}
   