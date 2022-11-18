window.onload=function(){
    var myElement = document.getElementById('myElement');

    // We create a manager object, which is the same as Hammer(), but without the presetted recognizers. 
    var mc = new Hammer.Manager(myElement);
    
    
    // Tap recognizer with minimal 2 taps
    mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
    // Single tap recognizer
    mc.add( new Hammer.Tap({ event: 'singletap' }) );
    
    
    // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
    mc.get('doubletap').recognizeWith('singletap');
    // we only want to trigger a tap, when we don't have detected a doubletap
    mc.get('singletap').requireFailure('doubletap');
    
    
    mc.on("singletap doubletap", function(ev) {
        myElement.textContent += ev.type +" ";
    });
}