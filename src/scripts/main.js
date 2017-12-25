import * as audio from './audio'

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(audio.analyse)