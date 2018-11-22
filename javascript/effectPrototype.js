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
    this.parameters = [];       // speichert die Paramater eines Effekts, wie z.B. Gain, Depth, Frequenz, etc.
    var nodes = [];
    var on = true;

    
    // Erstellen und Verbinden der Audio Nodes:
    var inputGain = this.audioContext.createGain();
    var outputGain = this.audioContext.createGain();
    var dryGain = this.audioContext.createGain();
    var wetGain = this.audioContext.createGain();
    nodes.push(inputGain);
    //nodes.push(outputGain);
    nodes.push(dryGain);
    nodes.push(wetGain);
    dryGain.gain.value = 0;
    inputGain.connect(dryGain);
    dryGain.connect(outputGain);
    wetGain.connect(outputGain);

    var destroy = function(){
        for (var i=0; i<nodes.length; i++){
            nodes[i].disconnect();
        }
    }

    // Definieren des Effekttypen, bspw. Tremolo, Filter, etc. (public)
    this.setEffectType = function(type) {
        effectType = type;
        this.effectID = effectType + id;
        console.log(this.effectID + " added");
    }

    // dem Effekt einen neuen Parameter hinzufügen (public)
    this.addParameter = function(name, unit, min, max, value, step, target) {     
        this.parameters.push(new Parameter(this.effectID, name, unit, min, max, value, step, target));
        //this.insertIntoGUI();
        //this.addListeners();
    }

    this.updateParameters = function() {}

    this.addNode = function(node){
        nodes.push(node);
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

    // Hinzfügen des HTML-Codes der GUI-Elemente in dei HTML-Datei
    this.insertIntoGUI = function(){
        var parameterString = "";
        for (var i=0; i<this.parameters.length; i++){
            p = this.parameters[i];
            if (p.step < 0.1){
                p.value.value = parseFloat(p.value.value).toFixed(2);
            }
            if (p.step < 1 && p.step >= 0.1){
                p.value.value = parseFloat(p.value.value).toFixed(1);
            }
            parameterString +=
            '<div class="paramName1" id="' + p.id + '">' + p.name + ': ' + p.value.value + p.unit + '</div>' +
            '   <input class="paramSlider1" id="' + p.sliderID + '" type="range" min="' + p.min + '" max="' + p.max + '" value="' + p.value.value + '" step="' + p.step + '">' +
            '</div>'
        }

        var ledString;
        if (on) {ledString = "led";} else{ledString = "ledOff";}

        var htmlString = 
        '   <div class="effectContainer">' +
        '      <div class="effectPedal ' + effectType + '" id="' + this.effectID + '">' +
        '          <div class="removeButton" id="' + this.effectID + 'XButton">X</div>' +
        '          <div class="frontPanel">' +
        '          <div class="effectTitle">' + effectType + '</div>' + parameterString +
        '          <div class="' + ledString + '" id="' + this.effectID + 'LED"></div>' +
        '          <div class="lowerPanel">' + 
        '              <div class="arrow leftArrow" id="' + this.effectID + 'LeftArrow"></div>' +
        '              <div class="onOffButtonRing">' +
        '                  <div class="onOffButton" id="' + this.effectID + 'OnOff"></div>' +
        '               </div>' +
        '              <div class="arrow rightArrow" id="' + this.effectID + 'RightArrow"></div>' +
        '          </div>' +
        '      </div>' +
        '   </div>';
        document.getElementById("effectPedalWindow").innerHTML += htmlString
    }

    // Definieren der Listener für die Parameter-Slider, den On/Off- und X-Button
    this.addListeners = function() {
        for (var i=0; i<this.parameters.length; i++){
            var index = i;
            //var parameters = this.parameters;
            var p = this.parameters[i];
            var param = document.getElementById(p.id);
            var slider = document.getElementById(p.sliderID);
            var updateParameters = this.updateParameters;
            slider.oninput = function() {
                var value = this.value
                if (p.step < 0.1){
                    p.value.value = parseFloat(p.value.value).toFixed(2);
                }
                if (p.step < 1 && p.step >= 0.1){
                    p.value.value = parseFloat(p.value.value).toFixed(1);
                }
                param.innerHTML = p.name + ': ' + value + p.unit;
                p.value.value = this.value;
                //parameters[index].target.value = this.value;
                updateParameters();
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
            destroy();
        }

        var leftArrow = document.getElementById(this.effectID + "LeftArrow");
        var thisEffect = this;
        leftArrow.onclick = function() {
            moveEffectLeft(thisEffect);
            console.log("LeftArrow");
        }
        var rightArrow = document.getElementById(this.effectID + "RightArrow");
        var thisEffect = this;
        rightArrow.onclick = function() {
            moveEffectRight(thisEffect);
            console.log("RightArrow");
        }
    }
}


// Definition der "Klasse" Parameter
function Parameter(effectID, name, unit, min, max, value, step/*, target*/) {
    this.name = name;
    this.id = effectID + name;
    this.unit = unit;
    this.min = min;
    this.max = max;
    this.value = value;
    this.step = step;
    //this.target = target;
    this.sliderID = effectID + name + "Slider";
}