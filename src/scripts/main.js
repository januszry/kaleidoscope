import * as audio from './audio'
import * as visualize from './visualize'
import * as store from './store'

import imageURL from '../assets/glow-small.png'

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(audio.analyse)

const playButton = document.querySelector('.play-button')
const redoButton = document.querySelector('.redo-button')
const crepe = document.getElementById('crepe')
const title = document.getElementById('title')
const world = document.querySelector('#playground .world')
const mirroredWorld = document.querySelector('#playground .mirrored-world')

function prepare() {
  visualize.init()
  store.status = 'PREPARING'
  world.style.backgroundImage = `url(${imageURL})`
  document.body.style.backgroundColor = '#EDECEC'

  world.style.display = 'block'
  mirroredWorld.style.display = 'none'
  const mirrorCanvas = mirroredWorld.querySelector('canvas')
  const mirrorContext = mirrorCanvas.getContext('2d')
  mirrorContext.clearRect(0, 0, mirrorCanvas.width, mirrorCanvas.height)
  for (const e of [crepe, playButton, redoButton, title]) {
    if (!e) {
      continue
    }
    e.classList.remove('playing')
  }
}

function play() {
  if (store.status === 'PREPARING') {
    store.status = 'PLAYING'
    visualize.closeContainer()
    visualize.zoomOut()
  }
  for (const e of [crepe, playButton, redoButton, title]) {
    if (!e) {
      continue
    }
    e.classList.add('playing')
  }
  world.style.backgroundImage = 'none'
  document.body.style.backgroundColor = '#404040'
  world.style.display = 'none'
  mirroredWorld.style.display = 'block'
  visualize.generate()
}

prepare()

playButton.onclick = play

redoButton.onclick = prepare
