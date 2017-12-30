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

function prepare() {
  visualize.init()
  store.status = 'PREPARING'
  world.style.backgroundImage = `url(${imageURL})`
  document.body.style.backgroundColor = '#EDECEC'
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
}

prepare()

playButton.onclick = play

redoButton.onclick = prepare
