const selectors = document.querySelectorAll('.sound-selector')
const drums     = document.querySelectorAll('div[data-key^="Key"]')

// ** Keyboard controll **

document.addEventListener('keydown', (e) => {
  const drum  = document.querySelector(`div[data-key="${e.code}"]`)
  const audio = document.querySelector(`audio[data-key="${e.code}"]`)

  if(!drum) return;

    play_hit(audio)

    drum.classList.add('drum-play')
    drum.addEventListener('transitionend', (e) => {

         if(e.propertyName != 'transform') return
         drum.classList.remove('drum-play')
  })
})

selectors.forEach( selector => {
  swap_hit(selector)
  change_volume(selector)
})

drums.forEach( drum => {
  touch_play(drum)
})

// ** mobile **

function touch_play(drum) {
  drum.onpointerdown = function() {
    const sound = document.querySelector(`audio[data-key="${this.dataset.key}"]`)
    play_hit(sound)

    drum.classList.add('drum-play')
    drum.addEventListener('transitionend', (e) => {

         if(e.propertyName != 'transform') return
         drum.classList.remove('drum-play')
    })
  }
}

// ** fn **

function play_hit(audio) {
  audio.currentTime = 0
  audio.play()
}

function swap_hit(el) {
  const sound    = el.querySelector('audio')
  const selector = el.querySelector('select')

  selector.onchange = function() {
    sound.src = this.value
  }
}

function change_volume(el) {
  const input = el.querySelector('input[type="range"')
  const sound = el.querySelector('audio')

  if(!input) return;

  input.onchange = function() {
    sound.volume = this.value
  }
}