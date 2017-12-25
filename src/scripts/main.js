import * as audio from './audio'
import * as visualize from './visualize'

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(audio.analyse)

visualize.test()
