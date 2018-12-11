
function Flanger(audioContext) {
    this.setEffectType("Flanger");
    var rate = {value: 0.5};
    var delayTime = {value: 2};     // 25ms
    var depth = {value: 10};
    var feedback = {value: 2};

    var filter = this.audioContext.createBiquadFilter();
    filter.type = "allpass";
    filter.frequency.value = 570;
    filter.Q.value = 1;
    //filter.gain.value = level.value;


    var delay = audioContext.createDelay(1);
    delay.delayTime.value = delayTime.value / 1000;

    var feedbackGain = audioContext.createGain();
    feedbackGain.gain.value = feedback.value / 10 * 0.7;

    var gain = audioContext.createGain();
    gain.gain.value = depth.value / 10000;
    
    var oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = rate.value / 3;
    oscillator.connect(gain);
    oscillator.start();

    var finalGain = audioContext.createGain();
    finalGain.gain.value = 0.7;

    this.addParameter("Depth", "", 0, 10, depth, 0.1);
    this.addParameter("Feedback", "", 0, 10, feedback, 0.1);
    //this.addParameter("Time", "ms", 0, 50, delayTime, 1);
    this.addParameter("Rate", "", 0, 10, rate, 0.1);

    this.getInput().gain.value = 0.6;   
    gain.connect(delay.delayTime);
    this.getInput().connect(this.getWetGain());
    //this.getInput().connect(filter);
    this.getInput().connect(delay);
    //filter.connect(delay);
    delay.connect(feedbackGain);
    feedbackGain.connect(filter);
    filter.connect(delay);
    //feedbackGain.connect(delay);
    delay.connect(finalGain);
    finalGain.connect(this.getWetGain());

    this.updateParameters = function() {
        feedbackGain.gain.value = feedback.value / 10 * 0.7;
        gain.gain.value = depth.value / 10000;
        //delay.delayTime.value = delayTime.value / 1000;
        oscillator.frequency.value = rate.value / 2;
    }
}