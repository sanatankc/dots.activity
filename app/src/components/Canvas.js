import React, { Component } from 'react'
import styled from 'styled-components'
import debounce from 'debounce'
import OverLay from './Overlay'
import centerBalls from './centerBalls'
import MovingBall from './MovingBall'

const Canvas = styled.canvas`
  background: #ebebeb;
`

export default class CanvasBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      centerBallState: 0,
      isPlaying: false,
      isFirstTime: true,
      score: 0,
      bestScore: 0
    }
    this.click = new Audio('sounds/mouth.wav')
    this.click.volume = 0.1
    this.eatSound = new Audio('sounds/eat.wav')
    this.gameOver = new Audio('sounds/game_over.wav')
    this.gameOver.volume = 0.5
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d')
    this.handleCanvasSize()
    this.movingBall = new MovingBall(
      this.ctx,
      this.canvas.width,
      this.canvas.height,
      this.pause.bind(this),
      this.incrementScore.bind(this),
      this.setBestScore.bind(this),
      this.eatSound,
      this.gameOver
  )
    this.draw()
    window.addEventListener('resize', () => {
      this.handleCanvasSize()
    })
    window.addEventListener('keydown', debounce(this.handleKeyDown.bind(this)))
  }

  incrementScore() {
    this.setState(prev => ({ score: prev.score + 1 }))
  }

  clearScore() {
    this.setState(prev => ({ score: 0 }))
  }

  setBestScore() {
    this.setState(prev => (
      (prev.bestScore < prev.score)
        ? {bestScore: prev.score}
        : {bestScore: prev.bestScore}
    ))
  }

  pause() {
    this.setState({isPlaying: false})
  }

  handleKeyDown(e) {
    const { centerBallState } = this.state
    const { key } = e
    if (key === 'ArrowLeft') {
      this.click.play()
      this.setState(prev => {
        const stateToset = prev.centerBallState === 0 ? 3 : prev.centerBallState - 1
        return { centerBallState: stateToset }
      })
    } else if (key === 'ArrowRight') {
      this.click.play()
      this.setState(prev => {
        const stateToset = prev.centerBallState === 3 ? 0 : prev.centerBallState + 1
        return { centerBallState: stateToset }
      })
    }
  }

  handleCanvasSize() {
    this.windowHeight = window.innerHeight - 58
    this.windowWidth = window.innerWidth
    this.canvas.height = (this.windowHeight > 800) ? 800 : this.windowHeight
    this.canvas.width = (this.windowWidth > 800) ? 800 : this.windowWidth
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this))
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.movingBall.draw(this.state.centerBallState, this.state.isPlaying)
    centerBalls(this.ctx, (this.canvas.width / 2), (this.canvas.height / 2), this.state.centerBallState)
  }

  onPlayClick() {
    this.click.play()
    try {
      this.gameOver.pause()
      this.gameOver.currentTime = 0
    } catch(e) {
      console.error('Nope!')
    }
    this.setState({
      isPlaying: true,
      score: 0,
      isFirstTime: false
    })
  }

  render() {
    return ([
      <OverLay
        isPlaying={this.state.isPlaying}
        isFirstTime={this.state.isFirstTime}
        onPlayClick={this.onPlayClick.bind(this)}
        key={0}
        score={this.state.score}
        bestScore={this.state.bestScore}
      />,
      <Canvas innerRef={canvas => {this.canvas = canvas}} key={1} ></Canvas>
    ])
  }
}