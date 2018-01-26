import tippy from 'tippy.js'

const state = {
  phase: null,
  index: null,
}

const tipContents = {
  intro: [
    'Welcome to Kaleidoscope!',
    'I\'m Ms. Crepe. 💗',
    'Here you can use your voice to create colorful gems.',
    '🔵🔻🔶',
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

function showText(nextState) {
  tip.setAttribute('title', tipContents[nextState.phase][nextState.index])
  state.phase = nextState.phase
  state.index = nextState.index
}

function switchToNextState(clicked) {
  const length = tipContents[state.phase].length
  let nextState
  if (length > state.index + 1) {
    // TODO check enough
    nextState = {
      phase: state.phase,
      index: state.index + 1,
    }
    showText(nextState)
  } else if (state.phase === 'intro' && clicked) {
    nextState = {
      phase: 'guide',
      index: 0,
    }
    setAsVeteran()
  } else if (state.phase === 'hints') {
    // TODO check enough
  }
  setTimeout(switchToNextState, 2000)
}

export function init() {
  tippy(tip, {
    trigger: 'manual',
    dynamicTitle: true,
  })
  const nextState = { index: 0 }
  if (!isVeteran()) {
    nextState.phase = 'intro'
  } else {
    nextState.phase = 'guide'
  }
  showText(nextState)
  tip._tippy.show()
  setTimeout(switchToNextState, 2000)
}
