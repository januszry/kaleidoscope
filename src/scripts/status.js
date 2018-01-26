import * as visualize from './visualize'

const statusMap = {
  PREPARING: 'PREPARING',
  READY: 'READY',
  PLAYING: 'PLAYING',
}

let currentStatus = 'PREPARING'

let gemCount = 0

const wrapper = document.getElementById('wrapper')

export function isPreparing() {
  return currentStatus === statusMap.PREPARING
}

export function isReady() {
  return currentStatus === statusMap.READY
}

export function isPlaying() {
  return currentStatus === statusMap.PLAYING
}

export function incrGem() {
  ++gemCount > 20 && !isReady() && setStatusToReady()
}

export function isGemOverFilled() {
  return gemCount > 40
}

export function setStatusToPreparing() {
  currentStatus = statusMap.PREPARING
  gemCount = 0
  wrapper.classList.remove('playing')
  wrapper.classList.remove('ready')
  visualize.clearMirrorCanvas()
}

export function setStatusToPlaying() {
  currentStatus = statusMap.PLAYING
  wrapper.classList.remove('ready')
  wrapper.classList.add('playing')
}

export function setStatusToReady() {
  currentStatus = statusMap.READY
  wrapper.classList.remove('playing')
  wrapper.classList.add('ready')
}
