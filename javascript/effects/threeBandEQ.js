
function ThreeBandEQ() {

    this.setEffectType("ThreeBandEQ");
    var bass = {value: 0};
    var middle = {value: -10};
    var treble = {value: 0};

    var filter1 = this.audioContext.createBiquadFilter();
    filter1.type = "lowshelf";
    filter1.frequency.value = 150;
    filter1.gain.value = bass.value;
    this.addNode(filter1);

    var filter2 = this.audioContext.createBiquadFilter();
    filter2.type = "peaking";
    filter2.frequency.value = 1000;
    filter2.Q.value = 2;
    filter2.gain.value = middle.value;
    this.addNode(filter2);

    var filter3 = this.audioContext.createBiquadFilter();
    filter3.type = "highshelf";
    filter3.frequency.value = 4000;
    filter3.gain.value = treble.value;
    this.addNode(filter3);
    
    this.addParameter("Bass", "dB", -30, 30, bass, 1);
    this.addParameter("Middle", "dB", -30, 30, middle, 1);
    this.addParameter("Treble", "dB", -30, 30, treble, 1);

    this.getInput().connect(filter1);
    filter1.connect(filter2);
    filter2.connect(filter3);
    filter3.connect(this.getWetGain());

    this.updateParameters = function() {
        filter1.gain.value = bass.value;
        filter2.gain.value = middle.value;
        filter3.gain.value = treble.value;
    }
}