import * as audio from './audio'
import * as visualize from './visualize'
import * as store from './store'

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(audio.analyse)

const playButton = document.querySelector('.play-button')
const redoButton = document.querySelector('.redo-button')
const crepe = document.getElementById('crepe')

playButton.onclick = function() {
  if (store.status === 'PREPARING') {
    store.status = 'PLAYING'
    visualize.zoomOut()
  }
  playButton.style.display = 'none'
  crepe.style.display = 'none'
}
