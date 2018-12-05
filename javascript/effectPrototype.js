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

    var destroy = function() {
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
    this.addParameter = function(name, unit, min, max, value, step/*, target*/) {     
        this.parameters.push(new Parameter(this.effectID, name, unit, min, max, value, step/*, target*/));
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
            '   <input class="paramSlider1" id="' + p.sliderID + '" type="range" min="' + p.min + '" max="' + p.max + '" value="' + p.value.value + '" step="' + p.step + '">'
        }

        var ledString;
        if (on) {ledString = "led";} else{ledString = "ledOff";}

        var htmlString = 
        '   <div class="effectContainer">' +
        '      <div class="effectPedal ' + effectType + '" id="' + this.effectID + '">' +
        '          <div class="removeButton" id="' + this.effectID + 'XButton">X</div>' +
        '          <div class="frontPanel">' +
        '          <div class="effectTitle">' + effectType + 
        '          </div>' + parameterString + '</div>' +
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
        var updateParameters = this.updateParameters;
        if (this.parameters.length > 0){
            var parameter0 = this.parameters[0];
            var slider0 = document.getElementById(parameter0.sliderID);
            var param0 = document.getElementById(parameter0.id);
            slider0.oninput = function() {
                var value = this.value;
                if (parameter0.step < 0.1){
                    value = parseFloat(value).toFixed(2);
                }
                if (parameter0.step < 1 && p.step >= 0.1){
                    value = parseFloat(value).toFixed(1);
                }
                param0.innerHTML = parameter0.name + ': ' + value + parameter0.unit;
                parameter0.value.value = value;
                updateParameters();
            }
        }
        if (this.parameters.length > 1){
            var parameter1 = this.parameters[1];
            var slider1 = document.getElementById(parameter1.sliderID);
            var param1 = document.getElementById(parameter1.id);
            slider1.oninput = function() {
                var value = this.value;
                if (parameter1.step < 0.1){
                    value = parseFloat(value).toFixed(2);
                }
                if (parameter1.step < 1 && p.step >= 0.1){
                    value = parseFloat(value).toFixed(1);
                }
                param1.innerHTML = parameter1.name + ': ' + value + parameter1.unit;
                parameter1.value.value = value;
                updateParameters();
            }
        }
        if (this.parameters.length > 2){
            var parameter2 = this.parameters[2];
            var slider2 = document.getElementById(parameter2.sliderID);
            var param2 = document.getElementById(parameter2.id);
            slider2.oninput = function() {
                var value = this.value;
                if (parameter2.step < 0.1){
                    value = parseFloat(value).toFixed(2);
                }
                if (parameter2.step < 1 && p.step >= 0.1){
                    value = parseFloat(value).toFixed(1);
                }
                param2.innerHTML = parameter2.name + ': ' + value + parameter2.unit;
                parameter2.value.value = value;
                updateParameters();
            }
        }
        
        /*
        var updateParameters = this.updateParameters;
        var p;
        var slider;
        var param;
        for (var i=0; i<this.parameters.length; i++){
            //var index = i;
            //var parameters = this.parameters;
            p = this.parameters[i];
            //console.log(i);
            //console.log(p.name + ": " + p.sliderID);
            //slider = document.getElementById(p.sliderID);
            
            //console.log(slider.id);
            
            //var parameters = this.parameters;
            document.getElementById(p.sliderID).oninput = function() {
                param = document.getElementById(p.id);
                console.log(p.sliderID);
                var value = this.value;
                if (p.step < 0.1){
                    value = parseFloat(value).toFixed(2);
                }
                if (p.step < 1 && p.step >= 0.1){
                    value = parseFloat(value).toFixed(1);
                }
                param.innerHTML = p.name + ': ' + value + p.unit;
                p.value.value = value;
                //console.log(p.name + ": " + p.sliderID);
                //p[index].target.value = this.value;
                updateParameters();
            }
        }
        */
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
        }/*
        var pedal = document.getElementById(thisEffect.effectID);
        pedal.addEventListener("mouseenter", function(event){
            if(event.target === pedal){
                document.getElementById(thisEffect.effectID + 'XButton').classList.toggle("visible");
                document.getElementById(thisEffect.effectID + 'LeftArrow').classList.toggle("visible");
                document.getElementById(thisEffect.effectID + 'RightArrow').classList.toggle("visible");
                console.log("visible");
            }
        });
        pedal.addEventListener("mouseout", function(event){
            if(event.target == pedal){
                document.getElementById(thisEffect.effectID + 'XButton').classList.toggle("invisible");
                document.getElementById(thisEffect.effectID + 'LeftArrow').classList.toggle("invisible");
                document.getElementById(thisEffect.effectID + 'RightArrow').classList.toggle("invisible");
                console.log("invisible");
            }
        });*/
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