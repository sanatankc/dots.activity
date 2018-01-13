
const centerBalls = (ctx, x, y, state) => {
  switch(state) {
    case 0:
      circle(ctx, x, y - 20, 'black')
      circle(ctx, x, y + 20, '#cdcdcd')
      break
    case 1:
      circle(ctx, x + 20, y, 'black')
      circle(ctx, x - 20, y, '#cdcdcd')
      break
    case 2:
      circle(ctx, x, y + 20, 'black')
      circle(ctx, x, y - 20, '#cdcdcd')
      break
    case 3:
      circle(ctx, x - 20, y, 'black')
      circle(ctx, x + 20, y, '#cdcdcd')
      break
  }
}
const circle = (ctx, x, y, color) => {
  ctx.beginPath()
  ctx.arc(x, y, 20, 0, Math.PI*2, false)
  ctx.fillStyle = color
  ctx.fill()
}

export default centerBalls
