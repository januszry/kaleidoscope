import * as Matter from 'matter-js'

import imageURL from '../assets/glow-small.png'

const playground = document.getElementById('playground')
const world = playground.querySelector('.world')
world.style.backgroundImage = `url(${imageURL})`

// create an engine
const engine = Matter.Engine.create()

export function init() {
  // clear
  for (const c of world.querySelectorAll('canvas')) {
    c.remove()
  }
  Matter.World.clear(engine.world)
  Matter.Engine.clear(engine)

  // create a renderer
  const render = Matter.Render.create({
    element: world,
    engine: engine,
    options: {
      wireframes: false,
      width: 800,
      height: 800,
      background: 'transparent',
    },
  })

  const wallL = Matter.Bodies.rectangle(300, 500, 400, 5, {
    isStatic: true,
    angle: Math.PI / 3,
    chamfer: { radius: 3 },
    friction: 1,
  })
  const wallR = Matter.Bodies.rectangle(500, 500, 400, 5, {
    isStatic: true,
    angle: Math.PI * 2 / 3,
    chamfer: { radius: 3 },
    friction: 1,
  })

  // run the engine
  Matter.Engine.run(engine)
  // run the renderer
  Matter.Render.run(render)

  Matter.World.add(engine.world, [wallL, wallR])
}
init()

export function dropGem(color, size) {
  const dropPoint = Math.random() * 250 + 275
  const gem = Matter.Bodies.circle(dropPoint, 0, size, {
    friction: 1,
    render: {
      fillStyle: color,
    },
  })
  Matter.World.add(engine.world, [gem])
}

export function zoomOut() {
  const canvas = world.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  ctx.scale(0.3, 0.3)
}
