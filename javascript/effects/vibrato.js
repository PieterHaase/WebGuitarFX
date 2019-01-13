
function Vibrato(audioContext) {

    // Standardwerte der Effektparameter
    this.setEffectType("Vibrato");
    var rate = {value: 2};
    var depth = {value: 8};

    // Delay für die Tonhöhenmodulation
    var delay = audioContext.createDelay(1);
    delay.delayTime.value = 0;

    // Gainregler für den Oszillator
    var gain = audioContext.createGain();
    gain.gain.value = depth.value / 5000;
    
    // Oszillator für die periodische Änderung der Delayzeit
    var oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = rate.value;
    oscillator.connect(gain);
    oscillator.start();

    // Hinzufügen der Effektparameter
    this.addParameter("Rate", "", 0, 10, rate, 0.1);
    this.addParameter("Depth", "", 0, 10, depth, 0.1);

    // Verbinden der Audio-Nodes
    gain.connect(delay.delayTime);
    this.getInput().connect(delay);
    delay.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {
        gain.gain.value = depth.value / 5000;
        oscillator.frequency.value = rate.value;
    }
}