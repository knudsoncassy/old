/*
  The LFO controls the gain of the sound.
  
  Mouse Controlled LFO 2:
  https://codepen.io/DonKarlssonSan/pen/jPGNqw
*/

var audioContext;
var soundOscillator;
var gainOscillator;
var gainNode;
var isPlaying = false;

function initSound() {
  // This is not needed any more
  //var AudioContext = window.AudioContext || window.webkitAudioContext;
  // https://developers.google.com/web/updates/2014/07/Web-Audio-Changes-in-m36?hl=en
  audioContext = new AudioContext();

  // Oscillator for sound
  soundOscillator = audioContext.createOscillator();
  soundOscillator.type = "square";
  soundOscillator.frequency.value = 0;
  soundOscillator.start(0);

  // Oscillator for volume/gain
  gainOscillator = audioContext.createOscillator();
  gainOscillator.type = "sine";
  gainOscillator.frequency.value = 0;
  gainOscillator.start(0);
  
  // Controls the volume
  gainNode = audioContext.createGain();
  
  // Wire them up
  soundOscillator.connect(gainNode);
  gainOscillator.connect(gainNode.gain);
  gainNode.connect(audioContext.destination);
}

function toggleSound(toggleButton) {
  isPlaying = !isPlaying;
  if(isPlaying) {
    gainNode.gain.value = 1;
    toggleButton.innerHTML = "<h3>Stop</h3>"
  } else {
    soundOscillator.frequency.value = 0;
    gainOscillator.frequency.value = 0;
    gainNode.gain.value = 0;
    toggleButton.innerHTML = "<h3>Start</h3>"    
  }
}

function onMousemove(event) {
  if(isPlaying) {
    var lfoFrequency = Math.round(event.clientX / window.innerWidth * 30);
    gainOscillator.frequency.value = lfoFrequency;
    lfoFrequencySpan.innerHTML = lfoFrequency;

    var soundFrequency = Math.round(event.clientY / window.innerHeight * 1000);
    soundOscillator.frequency.value = soundFrequency;
    soundFrequencySpan.innerHTML = soundFrequency;
  }
}

function initControls() {
  soundFrequencySpan = document.getElementById("soundFrequency");
  lfoFrequencySpan = document.getElementById("lfoFrequency");
  document.addEventListener("mousemove", onMousemove, false);
}

function init() {
  initSound();
  initControls();
}

init();