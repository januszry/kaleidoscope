import * as nipplejs from 'nipplejs'

export function initJoystick() {
  const joystickZone = document.getElementById('joystick-head')
  const joystickRadius = 50
  const joystick = nipplejs.create({
    zone: joystickZone,
    color: 'rgba(0,0,0,0)',
    size: joystickRadius * 2,
  })
  const mask = document.getElementById('mask')
  const originHeight = 78
  joystick
    .on('move', (evt, data) => {
      const tx = data.distance * Math.cos(data.angle.radian)
      const ty = data.distance * Math.sin(data.angle.radian)
      const stretch = data.distance * Math.sin(data.angle.radian) / joystickRadius / 4 + 1
      joystickZone.style.transform = `rotate(${tx}deg)`
      joystickZone.style.height = `${originHeight * stretch}px`
      mask.style.marginLeft = `${tx}px`
      mask.style.marginTop = `${-ty}px`
    })
    .on('end', (evt, data) => {
      joystickZone.style.transform = `rotate(0deg)`
      joystickZone.style.height = `${originHeight}px`
      mask.style.marginLeft = 0
      mask.style.marginTop = 0
    })
}
