import * as Matter from 'matter-js'

const playground = document.getElementById('playground')

export function test() {
  // create an engine
  const engine = Matter.Engine.create()

  // create a renderer
  const render = Matter.Render.create({ element: playground, engine: engine })

  // create two boxes and a ground
  const boxA = Matter.Bodies.rectangle(400, 200, 80, 80)
  const boxB = Matter.Bodies.rectangle(450, 50, 80, 80)
  const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

  // add all of the bodies to the world
  Matter.World.add(engine.world, [boxA, boxB, ground])
  // run the engine
  Matter.Engine.run(engine)
  // run the renderer
  Matter.Render.run(render)
}
