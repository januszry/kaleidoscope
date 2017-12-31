const statusMap = {
  PREPARING: 'PREPARING',
  READY: 'READY',
  PLAYING: 'PLAYING',
}

let currentStatus = 'PREPARING'

let gemCount = 0

const wrapper = document.getElementById('wrapper')
const mirroredWorld = document.querySelector('#playground .mirrored-world')
const mirrorCanvas = mirroredWorld.querySelector('canvas')
const mirrorContext = mirrorCanvas.getContext('2d')

export function incrGem() {
  ++gemCount > 20 && setStatusToReady()
}

export function isPreparing() {
  return currentStatus === statusMap.PREPARING
}

export function isReady() {
  return currentStatus === statusMap.READY
}

export function isPlaying() {
  return currentStatus === statusMap.PLAYING
}

export function setStatusToPreparing() {
  currentStatus = statusMap.PREPARING
  gemCount = 0
  wrapper.classList.remove('playing')
  wrapper.classList.remove('ready')
  mirrorContext.clearRect(0, 0, mirrorCanvas.width, mirrorCanvas.height)
}

export function setStatusToPlaying() {
  currentStatus = status.PLAYING
  wrapper.classList.remove('ready')
  wrapper.classList.add('playing')
}

export function setStatusToReady() {
  currentStatus = status.READY
  wrapper.classList.remove('playing')
  wrapper.classList.add('ready')
}
