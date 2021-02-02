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
    if (!this.isPlaying) {
      this.playBtn.innerText = 'Stop';
      this.playBtn.classList.add('acive');
    } else {
      this.playBtn.innerText = 'Play';
      this.playBtn.classList.remove('acive');
    }
  }
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
