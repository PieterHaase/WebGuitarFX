//var audioContext;
//var source;


function EffectChain(audioContext, src) {
    //this.audioContext = audioContext;
    //this.source = source;
    var destination = audioContext.destination;
    var source = src;
    source.connect(destination);
    var effectArray = [];                  // speichert die Effekte in der Effektkette


    // Erneuern sämtlicher Effekt-Verbindungen
    var updateRouting = function(destination){
        if (effectArray.length == 0) {
            source.connect(destination);
        }
        if (effectArray.length == 1) {
            //source.disconnect(destination);
            source.connect(effectArray[0].getInput());
            effectArray[0].getOutput().connect(destination);
        }
        if (effectArray.length > 1) {
            source.connect(effectArray[0].getInput());
            for (let i=0; i<effectArray.length-1; i++ ) {
                effectArray[i].getOutput().connect(effectArray[i+1].getInput());
            }
            effectArray[effectArray.length-1].getOutput().connect(destination);
        }
    }
    
    // Aufheben sämtlicher Effekt-Verbindungen
    var disconnectAll = function(destination){
        if (effectArray.length == 1) {
            //source.disconnect(destination);
            source.disconnect(effectArray[0].getInput());
            effectArray[0].getOutput().disconnect(destination);
        }
        if (effectArray.length > 1) {
            source.disconnect(effectArray[0].getInput());
            for (let i=0; i<effectArray.length-1; i++ ) {
                effectArray[i].getOutput().disconnect(effectArray[i+1].getInput());
            }
            effectArray[effectArray.length-1].getOutput().disconnect(destination);
        }
    }

    // Hinzufügen eines Effekts am Ende der Effektkette
    this.addEffect = function(effect) {
        if(effectArray.length == 0) {
            source.disconnect(destination);
        }
        disconnectAll(destination);
        effectArray.push(effect);
        updateRouting(destination);
    };
    
    // Entfernen eines Effekts aus der Effektkette an bestimmter Position
    this.removeEffectAt = function(position) {
        disconnectAll(destination);
        effectArray.splice(position, 1);
        updateRouting(destination);
    }

    this.moveEffect = function(fromPosition, toPosition) {
        disconnectAll(destination);
        var store = effectArray[toPosition];
        effectArray[toPosition] = effectArray[fromPosition];
        effectArray[fromPosition] = store;
        updateRouting(destination);
    }

    this.updateSource = function(src) {
        if(effectArray.length == 0) {
            source.disconnect(destination);
        } else {
            source.disconnect(effectArray[0]);
        }
        source = src;
        updateRouting(destination);
    }

/*  
    this.getOutput = function() {
        return effectArray[0].getOutput();
    };
*/
}


