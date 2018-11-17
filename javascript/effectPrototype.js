// Node Graph:
//==========================================================|
//                                                          |
//   inputGain -----------------> dryGain ---> outputGain   |
//        \                                        ^        |
//         \-----> [Effekt] ----> wetGain --------/         |
//                                                          |
//==========================================================|
//     ([Effekt] wird später in der Subklasse definiert)    |


function EffectPrototype(audioContext, id){
    this.audioContext = audioContext;
    var id = id;
    var effectType;
    this.effectID;    
    var parameters = [];       // speichert die Paramater eines Effekts, wie z.B. Gain, Depth, Frequenz, etc.
    var on = true;

    
    // Erstellen und Verbinden der Audio Nodes:
    var inputGain = this.audioContext.createGain();
    var outputGain = this.audioContext.createGain();
    var dryGain = this.audioContext.createGain();
    var wetGain = this.audioContext.createGain();
    dryGain.gain.value = 0;
    inputGain.connect(dryGain);
    dryGain.connect(outputGain);
    wetGain.connect(outputGain);


    // Definieren des Effekttypen, bspw. Tremolo, Filter, etc. (public)
    this.setEffectType = function(type) {
        effectType = type;
        this.effectID = effectType + id;
        console.log(this.effectID + " added");
    }

    // dem Effekt einen neuen Parameter hinzufügen (public)
    this.addParameter = function(name, unit, min, max, value, step, target) {     
        parameters.push(new Parameter(this.effectID, name, unit, min, max, value, step, target));
        //this.insertIntoGUI();
        //this.addListeners();
    }

    // Getter-Methoden (public)
    this.getInput = function() {
        return inputGain;
    }
    this.getWetGain = function() {
        return wetGain;
    }
    this.getOutput = function() {
        return outputGain;
    }

    this.insertIntoGUI = function(){
        var parameterString = "";
        for (var i=0; i<parameters.length; i++){
            p = parameters[i];
            if (parameters[i].step < 1){
                p.value = parseFloat(p.value).toFixed(1);
            }
            parameterString +=
            '<div class="paramName1" id="' + p.id + '">' + p.name + ': ' + p.value + p.unit + '</div>' +
            '   <input class="paramSlider1" id="' + p.sliderID + '" type="range" min="' + p.min + '" max="' + p.max + '" value="' + p.value + '" step="' + p.step + '">' +
            '</div>'
        }

        var ledString;
        if (on) {
            ledString = "led";
        }
        else{
            ledString = "ledOff";
        }

        var htmlString = 
        '   <div class="effectContainer">' +
        '      <div class="effectPedal ' + effectType + '" id="' + this.effectID + '">' +
        '          <div class="removeButton" id="' + this.effectID + 'XButton">X</div>' +
        '          <div class="frontPanel">' +
        '          <div class="effectTitle">' + effectType + '</div>' + parameterString +
        '          <div class="' + ledString + '" id="' + this.effectID + 'LED"></div>' +
        '          <div class="onOffButtonRing">' +
        '              <div class="onOffButton" id="' + this.effectID + 'OnOff"></div>' +
        '          </div>' +
        '      </div>' +
        '   </div>';
        document.getElementById("effectPedalWindow").innerHTML += htmlString
    }

    this.addListeners = function() {
        for (var i=0; i<parameters.length; i++){
            var index = i;
            var param = document.getElementById(parameters[i].id);
            var slider = document.getElementById(parameters[i].sliderID);
            slider.oninput = function() {
                var value = this.value
                if (parameters[index].step < 1){
                    value = parseFloat(value).toFixed(1);
                }
                param.innerHTML = parameters[index].name + ': ' + value + parameters[index].unit;
                parameters[index].value = this.value;
                parameters[index].target.value = this.value;
            }
        }
        
        var onOffButton = document.getElementById(this.effectID + "OnOff");
        var effectID = this.effectID;
        onOffButton.onclick = function() {
            if (on){
                wetGain.gain.value = 0;
                dryGain.gain.value = 1;
                document.getElementById(effectID + "LED").className = "ledOff";
            }
            else {
                wetGain.gain.value = 1;
                dryGain.gain.value = 0;
                document.getElementById(effectID + "LED").className = "led";
            }
            on = !on;
        }

        var xButton = document.getElementById(this.effectID + "XButton");
        var thisEffect = this;
        xButton.onclick = function() {
            removeEffect(thisEffect);
        }
    }
}


// Definition der "Klasse" Parameter
function Parameter(effectID, name, unit, min, max, value, step, target) {
    this.name = name;
    this.id = effectID + name;
    this.unit = unit;
    this.min = min;
    this.max = max;
    this.value = value;
    this.step = step;
    this.target = target;
    this.sliderID = effectID + name + "Slider";
}