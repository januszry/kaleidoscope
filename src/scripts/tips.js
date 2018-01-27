import tippy from 'tippy.js'
import * as status from './status'

const state = {
  phase: null,
  index: null,
}

let nextSwitchTimeout
let bubble

const tipContents = {
  intro: [
    'Welcome to Kaleidoscope!',
    'I\'m Ms. Crepe. 💗',
    'Here you can use your voice to create colorful gems like 🔵🔻🔶',
    'Got it!',
  ],
  guide: [
    'Try to make a sound 🎵',
    'Or maybe sing for me 😉',
  ],
  hints: [
    'Tip: Your volume may affect the size of your gems.',
    'Tip: Your pitch may affect the color of your gems.',
  ],
  enoughHints: [
    'OK. That\'s enough!',
    'Click "Play!" to view your Kaleidoscope art!',
  ],
  overfilledHints: [
    'Too many!!!😱',
  ],
  playing: [
    'Shake my head and see what you will get!',
    'Click rotate buttons to see the magic!',
  ],
  touching: [
    'Be gentle!😵',
    'Hmmm',
    'Ohhh',
  ],
}

function clearSwitch() {
  if (nextSwitchTimeout) {
    clearTimeout(nextSwitchTimeout)
    nextSwitchTimeout = null
  }
}

function scheduleNextSwitch() {
  const timeout = Math.random() * 1000 + 2000
  nextSwitchTimeout = setTimeout(switchToNextState, timeout)
}

const tip = document.getElementById('tip')

function isVeteran() {
  return localStorage.getItem('is_veteran') === 'true'
}

function setAsVeteran() {
  localStorage.setItem('is_veteran', 'true')
}

function clearState() {
  localStorage.removeItem('is_veteran')
}

function doSwitch(nextState) {
  tip.setAttribute('title', tipContents[nextState.phase][nextState.index])
  state.phase = nextState.phase
  state.index = nextState.index
}

function switchToNextState(clicked) {
  const length = tipContents[state.phase].length
  let nextState
  if ((state.phase === 'guide' || state.phase === 'hints') && !status.isGemOverFilled() && status.isReady()) {
    nextState = {
      phase: 'enoughHints',
      index: 0,
    }
  } else if ((state.phase === 'guide' || state.phase === 'hints') && status.isGemOverFilled()) {
    nextState = {
      phase: 'overfilledHints',
      index: 0,
    }
  } else if (length > state.index + 1) {
    // TODO check enough
    nextState = {
      phase: state.phase,
      index: state.index + 1,
    }
  } else if (state.phase === 'intro' && clicked) {
    nextState = {
      phase: 'guide',
      index: 0,
    }
    setAsVeteran()
  } else if (state.phase === 'guide') {
    nextState = {
      phase: 'hints',
      index: 0,
    }
  } else if (state.phase === 'hints') {
    nextState = {
      phase: 'hints',
      index: 0,
    }
  } else if (state.phase === 'playing') {
    nextState = {
      phase: 'playing',
      index: 0,
    }
  } else if (state.phase === 'touching') {
    nextState = {
      phase: 'touching',
      index: 0,
    }
  }
  if (nextState) {
    doSwitch(nextState)
  }
  scheduleNextSwitch()
}

export function switchToPlayState() {
  clearSwitch()
  setAsVeteran()
  doSwitch({
    phase: 'playing',
    index: 0,
  })
  scheduleNextSwitch()
}

export function switchToTouchState() {
  clearSwitch()
  doSwitch({
    phase: 'touching',
    index: 0,
  })
  scheduleNextSwitch()
}

export function init() {
  clearSwitch()
  if (!bubble) {
    tippy(tip, {
      trigger: 'manual',
      dynamicTitle: true,
      arrow: true,
      arrowTransform: 'scaleX(0.5)',
      size: 'large',
      theme: 'white',
      offset: '1000px',
      interactive: true,
      hideOnClick: 'persistent',
    })
  }
  const nextState = { index: 0 }
  if (!isVeteran()) {
    nextState.phase = 'intro'
  } else {
    nextState.phase = 'guide'
  }
  doSwitch(nextState)
  tip._tippy.show()
  bubble = document.querySelector('.tippy-popper')
  bubble.onclick = () => {
    clearSwitch()
    switchToNextState(true)
  }
  scheduleNextSwitch()
}
