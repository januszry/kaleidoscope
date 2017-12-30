import * as audio from './audio'
import * as visualize from './visualize'

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(audio.analyse)

const playButton = document.querySelector('.play-button')
const redoButton = document.querySelector('.redo-button')

playButton.onclick = function() {
  // TODO
  console.log('Play!')
}

redoButton.onclick = function() {
  visualize.clearAll()
  visualize.init()
}
