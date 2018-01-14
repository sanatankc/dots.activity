export default class MovingBall {
  constructor(ctx, windowWidth, windowHeight, pause, incrementScore, setBestScore, eatSound, gameOver) {
    this.ctx = ctx
    this.windowWidth = windowWidth
    this.windowHeight = windowHeight
    this.dy = 1
    this.pause = pause
    this.dx = 1
    this.incrementScore = incrementScore
    this.setBestScore = setBestScore
    this.moveToTop = this.moveToTop.bind(this)
    this.moveToBottom = this.moveToBottom.bind(this)
    this.moveToLeft = this.moveToLeft.bind(this)
    this.moveToRight = this.moveToRight.bind(this)
    this.animateFromTop = this.animateFromTop.bind(this)
    this.animateFromBottom = this.animateFromBottom.bind(this)
    this.animateFromLeft = this.animateFromLeft.bind(this)
    this.animateFromRight = this.animateFromRight.bind(this)
    this.eatSound = eatSound
    this.gameOver = gameOver
    this.moveRandom()
  }

  handleResize(windowWidth, windowHeight) {
    console.log(this.x)
    this.windowWidth = windowWidth
    this.windowHeight = windowHeight
    console.log(this.windowWidth, this.windowHeight)
    if (this.motionState === 0 || this.motionState === 1) {
      this.x = windowWidth / 2
    } else {
      this.y = windowHeight / 2
    }
    console.log(this.x)
  }

  draw(playerState, isPlaying) {
    if (isPlaying) {
      this.randomMotion[1]()
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, 20, 0, Math.PI*2, false)
      this.ctx.fillStyle = this.color
      this.ctx.fill()
      this.playerState = playerState
      this.checkForCollison(playerState)
    }
  }

  checkForCollison() {
    switch(this.motionState) {
      case 0:
        if (this.y >= (this.windowHeight / 2 - 20)) {
          if (this.shouldWinTop()) {
            this.moveRandom()
            this.incrementScore()
            this.eatSound.play()
          } else {
            this.setBestScore()
            this.pause()
            this.gameOver.play()
            this.moveRandom()
          }
        }
        break
      case 1:
        if (this.y <= (this.windowHeight / 2 + 20)) {
          if (this.shouldWinBottom()) {
            this.moveRandom()
            this.incrementScore()
            this.eatSound.play()
          } else {
            this.setBestScore()
            this.pause()
            this.gameOver.play()
            this.moveRandom()
          }
        }
        break
      case 2:
        if (this.x >= (this.windowWidth / 2 - 20)) {
          if (this.shouldWinLeft()) {
            this.moveRandom()
            this.incrementScore()
            this.eatSound.play()
          } else {
            this.setBestScore()
            this.pause()
            this.gameOver.play()
            this.moveRandom()
          }
        }
        break
      case 3:
        if (this.x <= (this.windowWidth / 2 + 20)) {
          if (this.shouldWinRight()) {
            this.moveRandom()
            this.incrementScore()
            this.eatSound.play()
          } else {
            this.setBestScore()
            this.pause()
            this.gameOver.play()
            this.moveRandom()
          }
        }
        break
    }
  }

  shouldWinTop() {
    return (
      this.colorState === 0 && this.playerState === 0||
      this.colorState === 1 && this.playerState === 2
    )
  }

  shouldWinBottom() {
    return (
      this.colorState === 0 && this.playerState === 2||
      this.colorState === 1 && this.playerState === 0
    )
  }

  shouldWinLeft() {
    return (
      this.colorState === 0 && this.playerState === 3||
      this.colorState === 1 && this.playerState === 1
    )
  }

  shouldWinRight() {
    return (
      this.colorState === 0 && this.playerState === 1||
      this.colorState === 1 && this.playerState === 3
    )
  }

  moveRandom() {
    this.motionState = Math.floor(Math.random() * 4)
    this.colorState = Math.floor(Math.random() * 2)
    this.moveFunctions = [
      [this.moveToTop, this.animateFromTop],
      [this.moveToBottom, this.animateFromBottom],
      [this.moveToLeft, this.animateFromLeft],
      [this.moveToRight, this.animateFromRight],
    ]
    this.randomMotion = this.moveFunctions[this.motionState]
    this.color = ['black', '#cdcdcd'][this.colorState]
    this.dx = 1
    this.dy = 1
    this.randomMotion[0]()
  }

  moveToTop() {
    this.y = 0
    this.x = this.windowWidth / 2

  }
  animateFromTop() {
    this.y += this.dy
    this.dy *= 1.03
  }

  moveToBottom() {
    this.x = this.windowWidth / 2
    this.y = this.windowHeight
  }

  animateFromBottom() {
    this.y -= this.dy
    this.dy *= 1.03
  }

  moveToLeft() {
    this.y = this.windowHeight / 2
    this.x = 0
  }

  animateFromLeft() {
    this.x += this.dx
    this.dx *= 1.03

  }

  moveToRight() {
    this.y = this.windowHeight / 2
    this.x = this.windowWidth
  }

  animateFromRight() {
    this.x -= this.dx
    this.dx *= 1.03
  }
}
