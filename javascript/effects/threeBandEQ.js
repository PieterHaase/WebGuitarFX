
function ThreeBandEQ() {

    // Standardwerte der Effektparameter
    this.setEffectType("ThreeBandEQ");
    var bass = {value: 0};
    var middle = {value: -10};
    var treble = {value: 0};

    // Filter für tiefe Frequenzen
    var filter1 = this.audioContext.createBiquadFilter();
    filter1.type = "lowshelf";
    filter1.frequency.value = 150;
    filter1.gain.value = bass.value;

    // Filter für mittlere Frequenzen
    var filter2 = this.audioContext.createBiquadFilter();
    filter2.type = "peaking";
    filter2.frequency.value = 1000;
    filter2.Q.value = 2;
    filter2.gain.value = middle.value;

    // Filter für hohe Frequenzen
    var filter3 = this.audioContext.createBiquadFilter();
    filter3.type = "highshelf";
    filter3.frequency.value = 4000;
    filter3.gain.value = treble.value;

    // Hinzufügen der Effektparameter
    this.addParameter("Bass", "dB", -30, 30, bass, 1);
    this.addParameter("Middle", "dB", -30, 30, middle, 1);
    this.addParameter("Treble", "dB", -30, 30, treble, 1);

    // Verbinden der Audio-Nodes
    this.getInput().connect(filter1);
    filter1.connect(filter2);
    filter2.connect(filter3);
    filter3.connect(this.getWetGain());

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {
        filter1.gain.value = bass.value;
        filter2.gain.value = middle.value;
        filter3.gain.value = treble.value;
    }
}