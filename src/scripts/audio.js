const audioCtx = new AudioContext()
const analyser = audioCtx.createAnalyser()

function toHex(i, padding = 2) {
    let hex = Number(i).toString(16)
    while (hex.length < padding) {
        hex = '0' + hex
    }
    return hex
}

navigator.mediaDevices.getUserMedia({ audio: true, video: false})
    .then(stream => {
        const source = audioCtx.createMediaStreamSource(stream)
        source.connect(analyser)

        analyser.minDecibels = -40
        analyser.maxDecibels = -10
        analyser.fftSize = 32

        // TODO: assumed sample rate to 44100
        const frequencyDataArray = new Uint8Array(3)  // 44100 / 32 * 3 ~= 4k
        const timeDomainDataArray = new Uint8Array(32)

        function fetch() {
            // Schedule next redraw
            requestAnimationFrame(fetch)
            // Get spectrum data
            analyser.getByteFrequencyData(frequencyDataArray)
            analyser.getByteTimeDomainData(timeDomainDataArray)
            analyser.getByteTimeDomainData
            if (frequencyDataArray.reduce((a, b) => a + b, 0) > 0) {
                const r = toHex(frequencyDataArray[0])
                const g = toHex(frequencyDataArray[1])
                const b = toHex(frequencyDataArray[2])
                const vol = Math.max(...timeDomainDataArray)
                console.log(`#${r}${g}${b}`, vol)
            }
        }
        fetch()
    })
