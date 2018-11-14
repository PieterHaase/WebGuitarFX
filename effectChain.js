var audioContext;
var source;
var effectArray = [];

function EffectChain(audioContext, source) {
    this.audioContext = audioContext;
    this.source = source;
    source.connect(audioContext.destination);

    EffectChain.prototype.addEffect = function(effect) {
        if(effectArray.length == 0) {
            source.disconnect(audioContext.destination);
        }
        disconnectAll(audioContext.destination);
        effectArray.push(effect);
        updateRouting(audioContext.destination);
    };
    
    EffectChain.prototype.swapEffects = function(position1, position2) {

    };

    EffectChain.prototype.insertEffectAt = function(effect, position) {
        
    };
    
    EffectChain.prototype.getOutput = function() {
        return effectArray[0].getOutput();
    };
    EffectChain.prototype.removeEffectAt = function(position) {
        disconnectAll(audioContext.destination);
        effectArray.splice(position, 1);
        updateRouting(audioContext.destination);
    }
}

function updateRouting(destination){

    
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

function disconnectAll(destination){
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
