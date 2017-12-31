import * as audio from './audio'
import * as visualize from './visualize'
import * as status from './status'

import * as nipplejs from 'nipplejs'

const playButton = document.querySelector('.play-button')
const redoButton = document.querySelector('.redo-button')

function prepare() {
  status.setStatusToPreparing()
  visualize.init()
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(audio.analyse)
}
prepare()

function play() {
  status.setStatusToPlaying()
  visualize.closeContainer()
  visualize.generateKaleidoscope()
}

playButton.onclick = play
redoButton.onclick = prepare

const joystickZone = document.getElementById('joystick-head')
const joystickRadius = 50
const joystick = nipplejs.create({
  zone: joystickZone,
  color: 'rgba(0,0,0,0)',
  size: joystickRadius * 2,
})
const mask = document.getElementById('mask')
const originHeight = 78
joystick
  .on('move', (evt, data) => {
    const tx = data.distance * Math.cos(data.angle.radian)
    const ty = data.distance * Math.sin(data.angle.radian)
    const stretch = data.distance * Math.sin(data.angle.radian) / joystickRadius / 4 + 1
    joystickZone.style.transform = `rotate(${tx}deg)`
    joystickZone.style.height = `${originHeight * stretch}px`
    const maskPositionX = 50 - tx / joystickRadius * 20
    const maskPositionY = 50 + ty / joystickRadius * 50
    mask.style['background-position'] = `${maskPositionX}% ${maskPositionY}%`
  })
  .on('end', (evt, data) => {
    joystickZone.style.transform = `rotate(0deg)`
    joystickZone.style.height = `${originHeight}px`
    mask.style['background-position'] = 'center'
  })
