
// Definieren der Eingabeelemente
var liveButton = document.getElementById("liveButton");
var playButton = document.getElementById("playButton");
var inputGainSlider = document.getElementById("inputGain");
var outputGainSlider = document.getElementById("outputGain")
var sampleSelector = document.getElementById("sampleSelector");
var muteButton = document.getElementById("muteButton")
var addEffectButton = document.getElementById("addEffectButton");

function addGUIListeners(audioContext){

    // Button für den Live Input
    liveButton.addEventListener("click", function () {
        audioContext.resume();
        liveButton.classList.toggle("glowRed");
        if (isLive) {
            effectChain.updateSource(source);
        } else {
            if (isPlaying){
                playButton.classList.toggle("glowBlue");
                sampleArray[activeSampleNr].pause();
                isPlaying = false;
            }
            effectChain.updateSource(inputGain);
        }
        isLive = !isLive;
    });
    

    // Slider für Input- und OutputGain
    inputGainSlider.addEventListener ('input', function () {
        var value = this.value;
        if(value >= 0.9 && value <= 1.1){
            value = 1;
            inputGainSlider.value = 1;
        }
        inputGain.gain.value = value;
    });

    outputGainSlider.addEventListener ('input', function () {
        var value = this.value;
        if(value >= 0.9 && value <= 1.1){
            value = 1;
            outputGainSlider.value = 1;
        }
        outputGainValue = value;
        if(!mute){
            effectChain.adjustOutputGain(value);
        }
    });

    inputGainSlider.addEventListener ('dblclick', function () {
        inputGain.gain.value = 1;
        inputGainSlider.value = 1;
    });

    outputGainSlider.addEventListener ('dblclick', function () {
        outputGainSlider.value = 1;
        outputGainValue = 1;
        if(!mute) {
            effectChain.adjustOutputGain(outputGainValue);
        }
    });
    

    // Dropdown-Menü für die Auswahl von Gitarrensamples
    sampleSelector.addEventListener("change", function(){
        if (isPlaying) {
            playButton.classList.toggle("glowBlue");
            isPlaying = !isPlaying;
            sampleArray[activeSampleNr].pause();
        }
        var selection = sampleSelector.selectedIndex;
        activeSampleNr = selection;
    });
    

    // Play-Button zum Abspielen des Ausgewählten Samples
    playButton.addEventListener("click", function () {
        audioContext.resume();
        playButton.classList.toggle("glowBlue");
        if (isPlaying) {
            sampleArray[activeSampleNr].pause();
            //sampleArray[activeSampleNr].fastSeek(0);
            //playButton.innerHTML = "PLAY";
        } else {
            if (isLive) {
                liveButton.classList.toggle("glowRed");
                isLive =false;
            }
            source = sourceArray[activeSampleNr];
            effectChain.updateSource(source);
            sampleArray[activeSampleNr].play();
            console.log("Playing: " + activeSampleNr);
            //playButton.innerHTML = "STOP";
        }
        isPlaying = !isPlaying;
    });
    

    // Mute-Button für die Stummschaltung des Outputs
    muteButton.addEventListener ('click', function() {
        if(!mute){
            effectChain.adjustOutputGain(0);
        } else {
            effectChain.adjustOutputGain(outputGainValue);
        }
        mute = !mute;
        muteButton.classList.toggle("glowGreen");
    });
    

    // Button für das Hinzufügen von Effekten
    addEffectButton.addEventListener("click", function() {
        document.getElementById("myDropdown").classList.toggle("show");
        document.getElementById("myDropdown").onmouseleave = function() {
        document.getElementById("myDropdown").classList.toggle("show");
        }
    });
        
}