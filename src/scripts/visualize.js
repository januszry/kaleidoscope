import * as Matter from 'matter-js'

const playground = document.getElementById('playground')

// create an engine
export const engine = Matter.Engine.create()

// create a renderer
const render = Matter.Render.create({
  element: playground,
  engine: engine,
  options: {
    wireframes: false,
  },
})

const wallL = Matter.Bodies.rectangle(300, 300, 400, 5, {
  isStatic: true,
  angle: Math.PI / 3,
  chamfer: { radius: 3 },
  friction: 1,
})
const wallR = Matter.Bodies.rectangle(500, 300, 400, 5, {
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
  const gem = Matter.Bodies.circle(300, 0, size, {
    friction: 1,
    render: {
      fillStyle: color,
    },
  })
  Matter.World.add(engine.world, [gem])
}
