
// Visualiesierung des Eingangspegels für den Live-Input
function visualize() {
    var canvas = document.getElementById("inputMeter");
    var canvasCtx = canvas.getContext("2d");
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
 
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    // Funktion zum Zeichnen der Anzeige
    var draw = function() {
        drawVisual = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
    
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    
        var barWidth;
        var barHeight = HEIGHT;
        var x = 0;
        var maxValue = 0;
    
        for(var i = 0; i < bufferLength; i++) {
            maxValue = Math.max(maxValue, dataArray[i]);
        }
        barWidth = WIDTH*(maxValue/256)
        if (isLive){
            canvasCtx.fillStyle = 'rgba(0, 205, 50, 0.7)';
            if(maxValue >= 250){
                canvasCtx.fillStyle = 'rgba(255, 74, 74, 0.7)';
            }
            canvasCtx.fillRect(x,0,barWidth,barHeight);
        }      
    };

    draw();
}