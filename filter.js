var filter;

function Filter(thisContext) {

    var effectName = 'filter';
    var paramName1 = 'filterFrequency';
    var sliderName1 = 'filterFrequencySlider';

    filter = thisContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2500;
    filter.Q.value = 2;
    filter.gain.value = -20;

    insertFilterIntoGUI();

    document.getElementById(sliderName1).addEventListener("input", function() {
        filter.frequency.value = this.value;
        document.getElementById(paramName1).innerHTML = "frequency: " + this.value + " Hz";
    });

    function insertFilterIntoGUI() {   
        var string = 
        '   <div class="effectContainer">' +
        '      <div class="effectPedal" id="' + effectName + '">' +
        '          <div class="frontPanel">' +
        '          <div class="effectTitle">' + effectName + '</div>' +
        '          <div class="paramName1" id="' + paramName1 + '">frequency: 2500 Hz</div>' +
        '              <input class="paramSlider1" id="' + sliderName1 + '" type="range" min="10" max="5000" value="2500">' +
        '           </div>' +
        '          <div class="led" id="filterLED"></div>' +
        '          <div class="onOffButtonRing">' +
        '              <div class="onOffButton" id="filterOnOff"></div>' +
        '          </div>' +
        '      </div>' +
        '   </div>';
        document.getElementById("effectPedalWindow").innerHTML += string;
    }    
        
    Filter.prototype.getInput = function() {
        return filter;
    };

    Filter.prototype.getOutput = function() {
        return filter;
    };
}