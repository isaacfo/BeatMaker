class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play');
    this.currentKick = './allSounds/kick-classic.wav';
    this.currentKick = './allSounds/snare-acoustic01.wav';
    this.currentKick = './allSounds/hihat-acoutsic01.wav';
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll('select');
    this.muteBtns = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
  }
  activePad() {
    this.classList.toggle('active');
  }
  repeat() {
    let step = this.index % 8; // when index gets to 8, it restarts fue to no remainder
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2 `; // the 2 makes it fade back in nicely
      //check if pads are active
      if (bar.classList.contains('active')) {
        //check which sound pad is active
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.play();
          this.kickAudio.currentTime = 0; // to end the beat so the next one can start on time
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.play();
          this.snareAudio.currentTime = 0; // to end the beat so the next one can start on time
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hihatAudio.play();
          this.hihatAudio.currentTime = 0; // to end the beat so the next one can start on time
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000; // times 1000 cuz it goes by miliseconds
    //check if it's already playing
    //if null which is a falsey value set the interval and start playing
    if (this.isPlaying) {
      //clear interval
      clearInterval(this.isPlaying);
      // set it back to null so it can start back up when clicked again
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    //if not null
    if (this.isPlaying) {
      this.playBtn.innerText = 'Play';
      this.playBtn.classList.remove('active');
    } else {
      this.playBtn.innerText = 'Stop';
      this.playBtn.classList.add('active');
    }
  }
  // changes the sounds of the instruments based on what is chosen in the dropdowns
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case 'kick-select':
        this.kickAudio.src = selectionValue;
        break;
      case 'snare-select':
        this.snareAudio.src = selectionValue;
        break;
      case 'hihat-select':
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    //pulls the data-track number from the HTML to know which sound we on
    const muteIndex = e.target.getAttribute('data-track');
    e.target.classList.toggle('active');
    if (e.target.classList.contains('active')) {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 0;
          break;
        case '1':
          this.snareAudio.volume = 0;
          break;
        case '2':
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 1;
          break;
        case '1':
          this.snareAudio.volume = 1;
          break;
        case '2':
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector('.tempo-number');
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains('active')) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

//Event Listeners
drumKit.pads.forEach((pad) => {
  // "this" targets the pads
  pad.addEventListener('click', drumKit.activePad);
  pad.addEventListener('animationend', function() {
    this.style.animation = '';
  });
});

// did not use drumKit.start because "this" would target the button
drumKit.playBtn.addEventListener('click', () => {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener('change', function(e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener('click', function(e) {
    drumKit.mute(e);
  });
});

//"input" takes in all of the changes for the slider, if it were "change" it would only register one change after the sliding stopped
drumKit.tempoSlider.addEventListener('input', function(e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function(e) {
  drumKit.updateTempo(e);
});
