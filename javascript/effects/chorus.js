
function Chorus(audioContext) {
    this.setEffectType("Chorus");
    var rate = {value: 2};
    var delayTime = {value: 30};     // 25ms
    var depth = {value: 8};

    var delay = audioContext.createDelay(1);
    delay.delayTime.value = delayTime.value / 1000;

    var gain = audioContext.createGain();
    gain.gain.value = depth.value / 10000;
    
    var oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = rate.value;
    oscillator.connect(gain);
    oscillator.start();

    this.addParameter("Depth", "", 0, 10, depth, 0.1);
    this.addParameter("Time", "ms", 0, 50, delayTime, 1);
    this.addParameter("Rate", "", 0, 10, rate, 0.1);

    this.getInput().gain.value = 0.6;   
    gain.connect(delay.delayTime);
    this.getInput().connect(this.getWetGain());
    this.getInput().connect(delay);
    delay.connect(this.getWetGain());

    this.updateParameters = function() {
        gain.gain.value = depth.value / 10000;
        delay.delayTime.value = delayTime.value / 1000;
        oscillator.frequency.value = rate.value;
    }
}