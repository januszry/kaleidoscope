import * as audio from './audio'
import * as visualize from './visualize'

import imageURL from '../assets/glow-small.png'

import { init } from './visualize'

const canvas = document.getElementById('playground-canvas')
canvas.style.backgroundImage = `url(${imageURL})`

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(audio.analyse)

init()
