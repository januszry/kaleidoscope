import * as audio from './audio'
import * as visualize from './visualize'
import * as status from './status'
import * as controller from './controller'
import * as tips from './tips'

const playButton = document.querySelector('.play-button')
const redoButton = document.querySelector('.redo-button')

function prepare() {
  status.setStatusToPreparing()
  visualize.init()
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(audio.analyse)
  tips.init()
}
prepare()

function play() {
  status.setStatusToPlaying()
  visualize.closeContainer()
  visualize.generateKaleidoscope()
  tips.switchToPlayState()
}

playButton.onclick = play
redoButton.onclick = prepare

controller.initJoystick()
controller.initKnob()
