WebGuitarFX
=============

[Link zur WebGuitarFX Website](https://pieterhaase.github.io/WebGuitarFX/index.html)

### To do
* Solo 1 Sample fixen
* Plakat
* Latenz verringern?
* Vibrato
* Compressor
* GUI Feinschliff
* 3-Band EQ?
* Presets?
* Audio Nodes löschen?
* Slider durch Drehknöpfe ersetzen

### Konzept
Das Ziel dieses Projekts ist das Erstellen einer Website, auf der einem Audiosignal musikalische Effekte beigemischt werden können. Konkret geht es speziell um das Ausgangssignal einer an einen Computer angeschlossenen E-Gitarre.
Diesem werden in der Musikproduktion häufig Effekte wie Filter, Verzerrung und Modulationseffekte beigemischt.
	
Diese Website soll optisch und von der Bedienung angelehnt an die Verwendung eines analogen „Effektboards“. Dies beschreibt in der Musikerwelt eine Ansammlung von Effektpedalen (die mit dem Fuß ein- und ausgeschaltet werden können, für die Verwendung im Live-Betrieb) die auf einem „Board“ montiert sind.


### Anforderungen
Angestrebt wird eine Latenz des Audiosignals von weniger als 20 Millisekunden von Eingang zu Ausgang. Damit soll erreicht werden, dass das Ausgangssignal z.B. bei Audioaufnahmen für das Monitoring verwendet werden kann, oder die Website beim Üben des Gitarrenspiels als Ersatz für einen Gitarrenverstärker verwendet werden kann.
Was die Art und Anzahl der Effekte angeht, die implementiert werden sollen, so wird von uns angestrebt dass das Projekt am Ende nach Möglichkeit folgende Effekte beinhaltet:

| Filter                   | Verzerrer      | Modulationseffekte | Hall / Echo |
| -------------------------|----------------| -------------------|-------------|
| 5-Band Equalizer         | Overdrive/Fuzz | Chorus             | Reverb      |
| Parametrischer Equalizer |                | Flanger            | Delay       |
|                          |                | Phaser             |             |
|                          |                | Tremolo            |             |
|                          |                | Vibrato            |             |

Ob sich sämtliche Effekte mit einem angemessenen Aufwand umsetzen lassen und ob die Zeit reicht um tatsächlich jeden einzelnen zu implementieren, können wir bisher noch nicht abschätzen.
Daher sollen als minimale Anforderung zumindest ein **Parametrischer 1-Band-Equalizer**, ein **Overdrive oder Fuzz**, ein **Chorus (oder Flanger/Phaser)**, ein **Tremolo** und ein **Delay** implementiert werden.
Diese sollen beliebig an- und ausgeschaltet, mit mehreren Parametern verändert und in ihrer Reihenfolge frei gewählt werden können.


### Bedienkonzept
Die Bedienoberfläche soll aus einem großen Fenster bestehen, in welchem die verschiedenen Effekte zu einer Effektkette aneinandergereiht werden können. Jeder Effekt wird durch ein Panel dargestellt, welches vom Aussehen an ein Gitarreneffektgerät im Fußpedal-Format angelehnt sein soll. Dabei unterscheiden sich die Effekte optisch voneinander und sollen nach Möglichkeit an existierende Gitarreneffektgeräte erinnern um die Bedienung für Gitarristen intuitiver zu gestalten.

![alt text](https://github.com/PieterHaase/WebGuitarFX/blob/gh-pages/media/UI_Mockup.png "Mockup des User-Interface")

Die Anordnung der Panels von links nach rechts soll dem Verlauf des Signalwegs entsprechen. Durch entsprechende Schaltflächen (Pfeile rechts und links) auf den Panels soll deren Reihenfolge frei verändert werden können.
Auf den jeweiligen Panels finden sich Regler und Schalter zum Ein- und Ausschalten des Effekts und für die Einstellung von Effektparametern wie Hall-Länge, Modulationsfrequenz oder ähnlichem wieder, welche je nach Art des Effekts unterschiedlich sein können. Ganz rechts in der Effektkette befindet sich ein leeres Panel, mit dem sich ein neuer Effekt hinzufügen lässt. Die Auswahl der Art des Effekts der hinzugefügt werden soll, soll idealerweise durch ein Kontext-Menü erfolgen.
