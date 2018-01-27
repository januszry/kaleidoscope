import { dropGem } from './visualize'
import * as status from './status'


function toHex(i, padding = 2) {
  let hex = Number(i).toString(16)
  while (hex.length < padding) {
    hex = '0' + hex
  }
  return hex
}

function findMax(arr, topIndex) {
  let maxIndex = 0
  let maxValue = 0
  for (let i = 0; i < Math.min(arr.length, topIndex); i++) {
    if (arr[i] > maxValue) {
      maxIndex = i
      maxValue = arr[i]
    }
  }
  return { maxIndex, maxValue }
}

export function analyse(stream) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const analyser = audioCtx.createAnalyser()
  const source = audioCtx.createMediaStreamSource(stream)
  source.connect(analyser)

  analyser.minDecibels = -45
  analyser.maxDecibels = -10
  analyser.fftSize = 2048

  // TODO: assumed sample rate to 44100
  const f = new Uint8Array(analyser.frequencyBinCount)  // 44100 / 2048 * 180 ~= 4k

  function fetch() {
    if (status.isPlaying()) {
      audioCtx.close()
      return
    }
    // Schedule next redraw
    requestAnimationFrame(fetch)

    // Get spectrum data
    analyser.getByteFrequencyData(f)
    const { maxIndex, maxValue } = findMax(f, 180)
    if (maxValue > 10) {
      const size = maxValue / 5 + 10
      const a = Math.random() * 0.3 + 0.5
      dropGem(`hsla(${maxIndex * 2}, 100%, 50%, ${a}`, size)
      status.incrGem()
    }
  }
  fetch()
}
