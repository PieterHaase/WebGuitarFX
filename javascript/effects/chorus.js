
function Chorus(audioContext) {

    // Standardwerte der Effektparameter
    this.setEffectType("Chorus");
    var rate = {value: 2};
    var delayTime = {value: 30};     // 30ms
    var depth = {value: 8};

    // Delay für die Tonhöhenmodulation
    var delay = audioContext.createDelay(1);
    delay.delayTime.value = delayTime.value / 1000;

    // Gainregler für den Oszillator
    var gain = audioContext.createGain();
    gain.gain.value = depth.value / 10000;
    
    // Oszillator für die periodische Änderung der Delayzeit
    var oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = rate.value;
    oscillator.start();

    // Hinzufügen der Effektparameter
    this.addParameter("Depth", "", 0, 10, depth, 0.1);
    this.addParameter("Time", "ms", 0, 50, delayTime, 1);
    this.addParameter("Rate", "", 0, 10, rate, 0.1);

    // Verbinden der Aduio-Nodes
    this.getInput().gain.value = 0.6;   // Input Gain herabsetzen um bei der Mischung von Dry und Wet ein Übersteuern zu vermeiden
    oscillator.connect(gain);   
    gain.connect(delay.delayTime);
    this.getInput().connect(this.getWetGain());
    this.getInput().connect(delay);
    delay.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {
        gain.gain.value = depth.value / 10000;
        delay.delayTime.value = delayTime.value / 1000;
        oscillator.frequency.value = rate.value;
    }
}
