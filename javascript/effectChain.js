
function EffectChain(audioContext, src) {

    var source = src;
    var destination = audioContext.destination;
    var effectArray = [];                  // speichert die Effekte in der Effektkette
    
    // Output Gain für die Gesamtlautstärke
    var outputGain = audioContext.createGain();

    // Verbinden der Auido-Nodes
    outputGain.connect(destination);
    source.connect(outputGain);
    
    // Erneuern sämtlicher Effekt-Verbindungen
    var updateRouting = function(){
        if (effectArray.length == 0) {
            source.connect(outputGain);
        }
        if (effectArray.length == 1) {
            source.connect(effectArray[0].getInput());
            effectArray[0].getOutput().connect(outputGain);
        }
        if (effectArray.length > 1) {
            source.connect(effectArray[0].getInput());
            for (let i=0; i<effectArray.length-1; i++ ) {
                effectArray[i].getOutput().connect(effectArray[i+1].getInput());
            }
            effectArray[effectArray.length-1].getOutput().connect(outputGain);
        }
    }
    
    // Aufheben sämtlicher Effekt-Verbindungen
    var disconnectAll = function(outputGain){
        if (effectArray.length == 1) {
            source.disconnect(effectArray[0].getInput());
            effectArray[0].getOutput().disconnect(outputGain);
        }
        if (effectArray.length > 1) {
            source.disconnect(effectArray[0].getInput());
            for (let i=0; i<effectArray.length-1; i++ ) {
                effectArray[i].getOutput().disconnect(effectArray[i+1].getInput());
            }
            effectArray[effectArray.length-1].getOutput().disconnect(outputGain);
        }
    }

    // Hinzufügen eines Effekts am Ende der Effektkette
    this.addEffect = function(effect) {
        if(effectArray.length == 0) {
            source.disconnect(outputGain);
        }
        disconnectAll(outputGain);
        effectArray.push(effect);
        updateRouting();
    };
    
    // Entfernen eines Effekts aus der Effektkette an bestimmter Position
    this.removeEffectAt = function(position) {
        disconnectAll(outputGain);
        effectArray.splice(position, 1);
        updateRouting();
    }

    // Verschieben der Effekte innerhalb der Effektkette
    this.moveEffect = function(fromPosition, toPosition) {
        disconnectAll(outputGain);
        var store = effectArray[toPosition];
        effectArray[toPosition] = effectArray[fromPosition];
        effectArray[fromPosition] = store;
        updateRouting();
    }

    // Ändern der Auidoqulle
    this.updateSource = function(src) {
        if(effectArray.length == 0) {
            source.disconnect(outputGain);
        } else {
            source.disconnect(effectArray[0]);
        }
        source = src;
        updateRouting();
    }

    // Ändern der Gesamtlautstärke
    this.adjustOutputGain = function(gain){
        outputGain.gain.value = gain;
    }
}


