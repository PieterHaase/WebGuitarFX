
// Hinzfügen des HTML-Codes der GUI-Elemente in dei HTML-Datei
insertEffectIntoGUI = function(effect){
    var parameterString = "";
    effectType = effect.effectType;
    effectID = effect.effectID;
    var parameters = effect.parameters;

    // Hinzfügen des HTML-Codes der Parameter-Slider in dei HTML-Datei
    for (var i=0; i<parameters.length; i++){
        p = parameters[i];
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

    // Ein- und Auschalten der "LED" abhängig davon, ob der Effekt ein- oder ausgeschaltet ist 
    var ledString;
    if (effect.on) {ledString = "led";} else{ledString = "ledOff";}

    // Hinzfügen des HTML-Codes der Effektpedale in dei HTML-Datei
    var htmlString = 
    '   <div class="effectContainer">' +
    '      <div class="effectPedal ' + effectType + '" id="' + effectID + '">' +
    '          <div class="removeButton" id="' + effectID + 'XButton">X</div>' +
    '          <div class="frontPanel">' +
    '          <div class="effectTitle">' + effectType + 
    '          </div>' + parameterString + '</div>' +
    '          <div class="' + ledString + '" id="' + effectID + 'LED"></div>' +
    '          <div class="lowerPanel">' + 
    '              <div class="arrow leftArrow" id="' + effectID + 'LeftArrow"></div>' +
    '              <div class="arrow rightArrow" id="' + effectID + 'RightArrow"></div>' +
    '              <div class="onOffButtonRing">' +
    '                  <div class="onOffButton" id="' + effectID + 'OnOff"></div>' +
    '               </div>' +  
    '          </div>' +
    '      </div>' +
    '   </div>';
    document.getElementById("effectPedalWindow").innerHTML += htmlString
}


// Listener für die Eingabeelemente
addEffectListeners = function(effect) {
    var onOffButton = document.getElementById(effect.effectID + "OnOff");
    var xButton = document.getElementById(effect.effectID + "XButton");
    var leftArrow = document.getElementById(effect.effectID + "LeftArrow");
    var rightArrow = document.getElementById(effect.effectID + "RightArrow");
    var parameters = effect.parameters;

    // Listener für die Parameter-Slider
    if (parameters.length > 0){
        var parameter0 = parameters[0];
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
            effect.updateParameters();
        }
    }
    if (parameters.length > 1){
        var parameter1 = parameters[1];
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
            effect.updateParameters();
        }
    }
    if (parameters.length > 2){
        var parameter2 = parameters[2];
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
            effect.updateParameters();
        }
    }


    // Listener für den On/Off- und X-Button
    onOffButton.onclick = function() {
        if (effect.on){
            effect.getWetGain().gain.value = 0;
            effect.getDryGain().gain.value = 1;
            document.getElementById(effect.effectID + "LED").className = "ledOff";
        }
        else {
            effect.getWetGain().gain.value = 1;
            effect.getDryGain().gain.value = 0;
            document.getElementById(effect.effectID + "LED").className = "led";
        }
        effect.on = !effect.on;
    }

    // Listener für den "X"-Button
    xButton.onclick = function() {
        removeEffect(effect);
        destroy();
    }

    // Listener für die Buttons zum verschieben der Effekte nach links und rechts
    leftArrow.onclick = function() {
        moveEffectLeft(effect);
        console.log("LeftArrow");
    }
    rightArrow.onclick = function() {
        moveEffectRight(effect);
        console.log("RightArrow");
    }
}