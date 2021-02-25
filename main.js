const selectors = document.querySelectorAll('.sound-selector');
const drums     = document.querySelectorAll('div[data-key^="Key"]');

selectors.forEach( node => {
  volume_change(node);
  sound_switcher(node);
});

drums.forEach( drum => {
  touch_play(drum);
});

document.addEventListener('keydown', play_audio)

// **********

function play_audio(event) {
  const drum  = document.querySelector(`div[data-key="${event.code}"]`);
  const audio = document.querySelector(`audio[data-key="${event.code}"]`);

  if(!drum) return;

    audio.currentTime = 0;
    audio.play();

    drum.classList.add('touched') ;
    drum.addEventListener('transitionend', (e) => {
      if(e.propertyName != 'transform') return;
      drum.classList.remove('touched')
    });
}

function volume_change(node) {
  const range = node.querySelector('input[type="range"]');
  const sound = node.querySelector('audio');

  if(!range) return;

  range.onchange = function() {
    sound.volume = this.value;
  };
}

function sound_switcher(node) {
  const sound  = node.querySelector('audio');
  const select = node.querySelector('select');

  select.onchange = function() {
    sound.src = this.value;
  };
}

function touch_play(drum) {
  drum.onpointerdown = function() {
    const sound = document.querySelector(`audio[data-key="${drum.dataset.key}"]`);

          sound.currentTime = 0;
          sound.play();

    drum.classList.add('touched')
    drum.addEventListener('transitionend', (e) => {
      if(e.propertyName != 'transform') return
      drum.classList.remove('touched')
    });
  }
}