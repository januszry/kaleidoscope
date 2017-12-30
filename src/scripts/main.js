import * as audio from './audio'
import * as visualize from './visualize'
import * as store from './store'

import imageURL from '../assets/glow-small.png'

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(audio.analyse)

const playButton = document.querySelector('.play-button')
const redoButton = document.querySelector('.redo-button')
const wrapper = document.getElementById('wrapper')
const crepe = document.getElementById('crepe')
const title = document.getElementById('title')
const world = document.querySelector('#playground .world')
const mirroredWorld = document.querySelector('#playground .mirrored-world')

function prepare() {
  store.status = 'PREPARING'

  visualize.init()

  world.style.backgroundImage = `url(${imageURL})`
  wrapper.classList.remove('playing')

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
  visualize.zoomOut()

  world.style.backgroundImage = 'none'
  wrapper.classList.add('playing')

  visualize.generate()
}

prepare()

playButton.onclick = play

redoButton.onclick = prepare
