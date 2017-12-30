import { dropGem } from './visualize'
import * as store from './store'

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
  const f = new Uint8Array(analyser.frequencyBinCount)  // 44100 / 32 * 3 ~= 4k
  const t = new Uint8Array(analyser.frequencyBinCount)

  function fetch() {
    // Schedule next redraw
    requestAnimationFrame(fetch)
    // Get spectrum data
    analyser.getByteFrequencyData(f)
    analyser.getByteTimeDomainData(t)

    if (store.status === 'PREPARING' && sum(f) > 0) {
      const vol = Math.max(...t)
      const size = (vol - 50) / 4
      if (size < 0) {
        return
      }
      const hsl = 360 * (f[0] / 256 / 256 + f[1] / 256 + f[2])
      const a = Math.random() * 0.3 + 0.5
      console.log(hsl, size)
      dropGem(`hsla(${hsl}, 100%, 50%, ${a})`, size)
    }
  }
  fetch()
}
