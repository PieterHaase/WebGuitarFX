
function Flanger(audioContext) {

    // Standardwerte der Effektparameter
    this.setEffectType("Flanger");
    var rate = {value: 0.5};
    var delayTime = {value: 2};     // 2ms
    var depth = {value: 10};
    var feedback = {value: 2};

    // Delay für die Tonhöhenmodulation
    var delay = audioContext.createDelay(1);
    delay.delayTime.value = delayTime.value / 1000;

    // Feedback-Gain
    var feedbackGain = audioContext.createGain();
    feedbackGain.gain.value = feedback.value / 10 * 0.7;

    // Gainregler für den Oszillator
    var gain = audioContext.createGain();
    gain.gain.value = depth.value / 10000;
    
    // Oszillator für die periodische Änderung der Delayzeit
    var oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = rate.value / 3;
    oscillator.connect(gain);
    oscillator.start();

    // Lautstärke des Wet-Signals an das Dry-Signal angleichen
    var outputGain = audioContext.createGain();
    outputGain.gain.value = 0.7;

    // HInzufügen der Effektparameter
    this.addParameter("Depth", "", 0, 10, depth, 0.1);
    this.addParameter("Feedback", "", 0, 10, feedback, 0.1);
    this.addParameter("Rate", "", 0, 10, rate, 0.1);

    // Verbinden der Aduio-Nodes
    this.getInput().gain.value = 0.6;   
    gain.connect(delay.delayTime);
    this.getInput().connect(this.getWetGain());
    this.getInput().connect(delay);
    delay.connect(feedbackGain);
    feedbackGain.connect(delay);
    delay.connect(outputGain);
    outputGain.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {
        feedbackGain.gain.value = feedback.value / 10 * 0.7;
        gain.gain.value = depth.value / 10000;
        oscillator.frequency.value = rate.value / 2;
    }
}