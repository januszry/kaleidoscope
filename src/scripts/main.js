import * as audio from './audio'
import * as visualize from './visualize'
import * as store from './store'

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(audio.analyse)

const playButton = document.querySelector('.play-button')
const redoButton = document.querySelector('.redo-button')
const wrapper = document.getElementById('wrapper')
const crepe = document.getElementById('crepe')
const title = document.getElementById('title')
const world = document.querySelector('#playground .world')
const mirroredWorld = document.querySelector('#playground .mirrored-world')
const readyButton = document.querySelector('.play-button')

function prepare() {
  store.status = 'PREPARING'
  store.gemCount = 0

  visualize.init()

  wrapper.classList.remove('playing')
  readyButton.classList.remove('ready')

  const mirrorCanvas = mirroredWorld.querySelector('canvas')
  const mirrorContext = mirrorCanvas.getContext('2d')
  mirrorContext.clearRect(0, 0, mirrorCanvas.width, mirrorCanvas.height)
}

function play() {
  if (store.status === 'PLAYING') {
    return
  }
  store.status = 'PLAYING'

  visualize.closeContainer()

  wrapper.classList.add('playing')
  readyButton.classList.remove('ready')

  visualize.generateKaleidoscope()
}

prepare()

playButton.onclick = play

redoButton.onclick = prepare
