import * as Matter from 'matter-js'

const canvas = document.getElementById('playground-canvas')

// create an engine
export const engine = Matter.Engine.create()

// create a renderer
const render = Matter.Render.create({
  element: canvas,
  engine: engine,
  options: {
    wireframes: false,
    width: 800,
    height: 800,
    background: 'transparent',
  },
})

const wallL = Matter.Bodies.rectangle(300, 400, 400, 5, {
  isStatic: true,
  angle: Math.PI / 3,
  chamfer: { radius: 3 },
  friction: 1,
})
const wallR = Matter.Bodies.rectangle(500, 400, 400, 5, {
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
