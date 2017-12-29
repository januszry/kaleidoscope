import { dropGem } from './visualize.js'

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const analyser = audioCtx.createAnalyser()

function toHex(i, padding = 2) {
  let hex = Number(i).toString(16)
  while (hex.length < padding) {
    hex = '0' + hex
  }
  return hex
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

export function analyse(stream) {
  const source = audioCtx.createMediaStreamSource(stream)
  source.connect(analyser)

  analyser.minDecibels = -40
  analyser.maxDecibels = -10
  analyser.fftSize = 32

  // TODO: assumed sample rate to 44100
  const frequencyDataArray = new Uint8Array(analyser.frequencyBinCount)  // 44100 / 32 * 3 ~= 4k
  const timeDomainDataArray = new Uint8Array(analyser.frequencyBinCount)

  function fetch() {
    // Schedule next redraw
    requestAnimationFrame(fetch)
    // Get spectrum data
    analyser.getByteFrequencyData(frequencyDataArray)
    analyser.getByteTimeDomainData(timeDomainDataArray)

    analyser.getByteTimeDomainData
    if (sum(frequencyDataArray) > 0) {
      const vol = Math.max(...timeDomainDataArray)
      const size = (vol - 50) / 8
      if (size < 0) {
        return
      }
      const r = toHex(frequencyDataArray[0])
      const g = toHex(frequencyDataArray[1])
      const b = toHex(frequencyDataArray[2])
      console.log(`#${r}${g}${b}`, size)
      dropGem(`#${r}${g}${b}`, size)
    }
  }
  fetch()
}
