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
    this.effectType;
    this.effectID;    
    this.parameters = [];       // speichert die Paramater eines Effekts, wie z.B. Gain, Depth, Frequenz, etc.
    this.on = true;

    
    // Erstellen und Verbinden der Audio Nodes:
    var inputGain = this.audioContext.createGain();
    var outputGain = this.audioContext.createGain();
    var dryGain = this.audioContext.createGain();
    var wetGain = this.audioContext.createGain();

    dryGain.gain.value = 0;
    inputGain.connect(dryGain);
    dryGain.connect(outputGain);
    wetGain.connect(outputGain);

    // Definieren des Effekttypen, bspw. Tremolo, Filter, etc.
    this.setEffectType = function(type) {
        this.effectType = type;
        this.effectID = this.effectType + id;
        console.log(this.effectID + " added");
    }

    // dem Effekt einen neuen Parameter hinzufügen
    this.addParameter = function(name, unit, min, max, value, step) {     
        this.parameters.push(new Parameter(this.effectID, name, unit, min, max, value, step));
    }

    // wird beim Bewegen der Slider aufgerufen und wendet die Einstellung auf die Parameter an
    this.updateParameters = function() {}           // wird innerhalb der einzelnen Effekte überschrieben

    // Getter-Methoden
    this.getInput = function() {
        return inputGain;
    }
    this.getDryGain = function() {
        return dryGain;
    }
    this.getWetGain = function() {
        return wetGain;
    }
    this.getOutput = function() {
        return outputGain;
    }
}


// Definition der "Klasse" Parameter
function Parameter(effectID, name, unit, min, max, value, step) {
    this.name = name;
    this.id = effectID + name;
    this.unit = unit;
    this.min = min;
    this.max = max;
    this.value = value;
    this.step = step;
    this.sliderID = effectID + name + "Slider";
}