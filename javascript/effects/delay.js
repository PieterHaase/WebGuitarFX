
function Delay(thisContext) {

    // Standardwerte der Effektparameter
    this.setEffectType("Delay");
    var effectLevel = {value: 9};    
    var feedback = {value: 4};
    var delayTime = {value: 0.2};

    // Erste Delay-Stufe
    var delay1 = thisContext.createDelay(1);
    delay1.delayTime.value = delayTime.value;
    var delay1Gain = thisContext.createGain();
    delay1Gain.gain.value = effectLevel.value/10 * feedback.value/10;

    // Zweite Delay-Stufe
    var delay2 = thisContext.createDelay(1);
    delay2.delayTime.value = delayTime.value;
    var delay2Gain = thisContext.createGain();
    delay2Gain.gain.value = effectLevel.value/10 * feedback.value/20;

    // Dritte Delay-Stufe
    var delay3 = thisContext.createDelay(1);
    delay3.delayTime.value = delayTime.value;
    var delay3Gain = thisContext.createGain();
    delay3Gain.gain.value = effectLevel.value/10 * feedback.value/80;

    // Hinzufügen der Effektparameter
    this.addParameter("Time", "s", 0, 1, delayTime, 0.01);
    this.addParameter("Feedback", "", 0, 10, feedback, 0.1);
    this.addParameter("Level", "", 0, 10, effectLevel, 0.1);

    // Verbinden der Aduio-Nodes
    this.getInput().connect(delay1);
    this.getInput().connect(this.getWetGain());
    delay1.connect(delay1Gain);
    delay1Gain.connect(this.getWetGain());
    delay1Gain.connect(delay2);
    delay2.connect(delay2Gain);
    delay2Gain.connect(this.getWetGain());
    delay2Gain.connect(delay3);
    delay3.connect(delay3Gain);
    delay3Gain.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {
        delay1.delayTime.value = delayTime.value;
        delay2.delayTime.value = delayTime.value;
        delay3.delayTime.value = delayTime.value;
        delay1Gain.gain.value = effectLevel.value/10 * feedback.value/10;
        delay2Gain.gain.value = effectLevel.value/10 * feedback.value/20;
        delay3Gain.gain.value = effectLevel.value/10 * feedback.value/80;
    }
}