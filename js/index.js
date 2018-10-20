/*
  The LFO controls the frequency of the sound.
*/

var audioContext;
var soundOscillator;
var lfo;
var lfoGain;
var gainNode;
var isPlaying = false;

function initSound() {
  // This is not needed any more
  //var AudioContext = window.AudioContext || window.webkitAudioContext;
  // https://developers.google.com/web/updates/2014/07/Web-Audio-Changes-in-m36?hl=en
  audioContext = new AudioContext();

  // Oscillator for sound
  soundOscillator = audioContext.createOscillator();
  soundOscillator.type = "sine";
  soundOscillator.frequency.value = 0;
  soundOscillator.start(0);

  // LFO
  // Used for changing the frequency of the sound
  // oscillator.
  lfo = audioContext.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0;
  lfo.start(0);
  
  // Controls the amplitude of LFO applied.
  // An oscillator node produces values
  // in the 0 - 1 range. By applying a
  // gain of 200 to the LFO we can make
  // it produce values in the 0 - 200
  // range.
  lfoGain = audioContext.createGain(); 
  lfoGain.gain.value = 200;
  
  // Controls the volume
  gainNode = audioContext.createGain();
  
  // Wire them up
  lfo.connect(lfoGain);
  lfoGain.connect(soundOscillator.frequency);
  soundOscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
}

function toggleSound(toggleButton) {
  isPlaying = !isPlaying;
  if(isPlaying) {
    gainNode.gain.value = 1;
    toggleButton.innerHTML = "<h3>Stop</h3>"
  } else {
    soundOscillator.frequency.value = 0;
    lfo.frequency.value = 0;
    gainNode.gain.value = 0;
    toggleButton.innerHTML = "<h3>Start</h3>"    
  }
}

function onMousemove(event) {
  if(isPlaying) {
    var lfoFrequency = Math.round(event.clientX / window.innerWidth * 30);
    lfo.frequency.value = lfoFrequency;
    lfoFrequencySpan.innerHTML = lfoFrequency;

    var soundFrequency = Math.round(event.clientY / window.innerHeight * 1000) + 200;
    soundOscillator.frequency.value = soundFrequency;
    soundFrequencySpan.innerHTML = soundFrequency;
  }
}

function initControls() {
  soundFrequencySpan = document.getElementById("soundFrequency");
  lfoFrequencySpan = document.getElementById("lfoFrequency");
  
  var lfoAmplitudeSlider = document.getElementById("lfoAmplitudeSlider");

  var lfoAmplitudeSpan = document.getElementById("lfoAmplitude");
  
  document.addEventListener("mousemove", onMousemove, false);
   lfoAmplitudeSlider.addEventListener("change", function () {
    lfoGain.gain.value = this.value; 
    lfoAmplitudeSpan.innerHTML = this.value;
  });
  lfoAmplitudeSlider.addEventListener("mousemove", function () {
    lfoGain.gain.value = this.value; 
    lfoAmplitudeSpan.innerHTML = this.value;
  });

}

function init() {
  initSound();
  initControls();
}

init();