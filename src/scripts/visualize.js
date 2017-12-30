import * as Matter from 'matter-js'

const world = document.querySelector('#playground .world')

// create an engine
const engine = Matter.Engine.create()

export const axes = {
  sx: 200,
  sy: 200,
  l: 400,
  w: 800,
  h: 800,
}

export function init() {
  // clear
  const canvas = world.querySelector('canvas')
  if (canvas) {
    canvas.remove()
  }
  Matter.World.clear(engine.world)
  Matter.Engine.clear(engine)

  // create a renderer
  const render = Matter.Render.create({
    element: world,
    engine: engine,
    options: {
      wireframes: false,
      width: axes.w,
      height: axes.h,
      background: 'transparent',
    },
  })

  const wallL = Matter.Bodies.rectangle(
    axes.sx + axes.l / 4, axes.sy + axes.l * Math.sqrt(3) / 4, axes.l, 5, {
      isStatic: true,
      angle: Math.PI / 3,
      chamfer: { radius: 3 },
      stiffness: 1,
      friction: 1,
      render: {
        fillStyle: 'white',
      }})
  const wallR = Matter.Bodies.rectangle(
    axes.sx + axes.l * 3 / 4, axes.sy + axes.l * Math.sqrt(3) / 4, axes.l, 5, {
      isStatic: true,
      angle: Math.PI * 2 / 3,
      chamfer: { radius: 3 },
      stiffness: 1,
      friction: 1,
      render: {
        fillStyle: 'white',
      }})

  // run the engine
  Matter.Engine.run(engine)
  // run the renderer
  Matter.Render.run(render)

  Matter.World.add(engine.world, [wallL, wallR])

  // create mouse constraints
  const mouse = Matter.Mouse.create(render.canvas)
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2, render: { visible: false } }
  })
  Matter.World.add(engine.world, mouseConstraint)
  render.mouse = mouse
}

export function closeContainer() {
  const wallU = Matter.Bodies.rectangle(
    axes.sx + axes.l / 2, axes.sy, axes.l, 5, {
      isStatic: true,
      chamfer: { radius: 3 },
      friction: 1,
      render: {
        fillStyle: 'white',
      }})
  return Matter.World.add(engine.world, [wallU])
}

const gemFactories = [
  // circle
  (dropPoint, size, color) => Matter.Bodies.circle(dropPoint, 0, size, {
    friction: 1,
    render: {
      fillStyle: color,
    },
  }),
  // triangle
  (dropPoint, size, color) => Matter.Bodies.polygon(dropPoint, 0, 3, size, {
    friction: 1,
    chamfer: { radius: 3 },
    render: {
      fillStyle: color,
    },
  }),
  // square
  (dropPoint, size, color) => Matter.Bodies.polygon(dropPoint, 0, 4, size, {
    render: {
      fillStyle: color,
    },
  }),
  // octagon
  (dropPoint, size, color) => Matter.Bodies.polygon(dropPoint, 0, 8, size, {
    render: {
      fillStyle: color,
    },
  }),
]

export function dropGem(color, size) {
  const dropPoint = Math.random() * 250 + 275

  const factory = gemFactories[Math.floor(Math.random() * gemFactories.length)]
  const gem = factory(dropPoint, size, color)
  return Matter.World.add(engine.world, [gem])
}

const dstCanvas = document.querySelector('#playground .mirrored-world canvas')
const dstContext = dstCanvas.getContext('2d')

function _drawWhiteBackground(ctx, dw, dh) {
  ctx.beginPath()
  ctx.lineTo(dw / 2, dh)
  ctx.lineTo(dw, 0)
  ctx.lineTo(0, 0)
  ctx.lineWidth = 1
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.strokeStyle = 'white'
  ctx.stroke()
}

function _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, ox, oy) {
  const canvas = dstCanvas
  const ctx = dstContext

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.translate(ox, oy)

  _drawWhiteBackground(ctx, dw, dh)
  ctx.drawImage(srcCanvas, axes.sx, axes.sy, sw, sh, 0, 0, dw, dh)
  ctx.rotate(120 * Math.PI / 180)
  _drawWhiteBackground(ctx, dw, dh)
  ctx.drawImage(srcCanvas, axes.sx, axes.sy, sw, sh, 0, 0, dw, dh)
  ctx.rotate(120 * Math.PI / 180)
  _drawWhiteBackground(ctx, dw, dh)
  ctx.drawImage(srcCanvas, axes.sx, axes.sy, sw, sh, 0, 0, dw, dh)
  ctx.rotate(120 * Math.PI / 180)

  ctx.scale(-1, 1)
  ctx.rotate(60 * Math.PI / 180)

  _drawWhiteBackground(ctx, dw, dh)
  ctx.drawImage(srcCanvas, axes.sx, axes.sy, sw, sh, 0, 0, dw, dh)
  ctx.rotate(120 * Math.PI / 180)
  _drawWhiteBackground(ctx, dw, dh)
  ctx.drawImage(srcCanvas, axes.sx, axes.sy, sw, sh, 0, 0, dw, dh)
  ctx.rotate(120 * Math.PI / 180)
  _drawWhiteBackground(ctx, dw, dh)
  ctx.drawImage(srcCanvas, axes.sx, axes.sy, sw, sh, 0, 0, dw, dh)
  ctx.rotate(120 * Math.PI / 180)

  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

export function generateKaleidoscope() {
  const sw = axes.l
  const sh = axes.l / 2 * Math.sqrt(3)
  const dw = sw / 5
  const dh = sh / 5
  const srcCanvas = world.querySelector('canvas')
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, 0, 0)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, dw * 3, 0)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, dw * -3, 0)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, dw * 1.5, dh)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, dw * 1.5, -dh)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, -dw * 1.5, dh)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, -dw * 1.5, -dh)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, 0, dh * 2)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, 0, -dh * 2)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, dw * 3, dh * 2)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, dw * 3, -dh * 2)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, -dw * 3, dh * 2)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, -dw * 3, -dh * 2)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, -dw * 1.5, dh * 3)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, -dw * 1.5, -dh * 3)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, dw * 1.5, dh * 3)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, dw * 1.5, -dh * 3)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, 0, dh * 4)
  _generateKaleidoscope(srcCanvas, sw, sh, dw, dh, 0, dh * -4)
}
