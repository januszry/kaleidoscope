import * as audio from './audio'
import * as visualize from './visualize'

import imageURL from '../assets/glow-small.png'

const playground = document.getElementById('playground')
playground.style.backgroundImage = `url(${imageURL})`

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(audio.analyse)
