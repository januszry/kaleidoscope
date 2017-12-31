import { dropGem } from './visualize'
import * as status from './status'


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
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const analyser = audioCtx.createAnalyser()
  const source = audioCtx.createMediaStreamSource(stream)
  source.connect(analyser)

  analyser.minDecibels = -50
  analyser.maxDecibels = -10
  analyser.fftSize = 32

  // TODO: assumed sample rate to 44100
  const f = new Uint8Array(analyser.frequencyBinCount)  // 44100 / 32 * 3 ~= 4k
  const t = new Uint8Array(analyser.frequencyBinCount)

  function fetch() {
    if (status.isPlaying()) {
      audioCtx.close()
      return
    }

    // Schedule next redraw
    requestAnimationFrame(fetch)
    // Get spectrum data
    analyser.getByteFrequencyData(f)
    analyser.getByteTimeDomainData(t)

    if (sum(f) > 0) {
      const vol = Math.max(...t)
      const size = (vol - 50) / 3.5
      if (size < 0) {
        return
      }
      const hsl = 360 * (f[0] / 256 / 256 + f[1] / 256 + f[2])
      const a = Math.random() * 0.3 + 0.5
      dropGem(`hsla(${hsl}, 100%, 50%, ${a})`, size)

      status.incrGem()
    }
  }
  fetch()
}
