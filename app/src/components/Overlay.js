import React, { Component } from 'react'
import styled from 'styled-components'

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  max-width: 800px;
  max-height: 800px;
  width: 100vw;
  height: calc(100vh - 55px) !important;
`
const Score = styled.div`
  margin-top: -150px;
  color: black;
  text-align: center;
  font-size: 36px;
`
const BestScore = styled.div`
  margin-top: 20px;
  color: black;
  text-align: center;
  font-size: 24px;
  letter-spacing: 2.2px;
  transition: 0.2s all ease-in-out;
  opacity: ${({isPlaying}) => isPlaying ? 0 : 1}
`
const Replay  = styled.div`
  background: ${({isFirstTime}) => isFirstTime
    ? "url('icons/play.svg')"
    : "url('icons/replay.svg')"
  };
  height: 55px;
  width: 55px;
  position: relative;
  transition: 0.2s all ease-in-out;
  opacity: ${({isPlaying}) => isPlaying ? 0 : 1};
  margin-bottom: 67px;
  top: 180px;
  left: 215px;
`
const Wrapper = styled.div`
  display: block;
`
const Help = styled.p`
  position: relative;
  top: 137px;
  left: 25px;
  text-align: center;
  transition: 0.2s all ease-in-out;
  opacity: ${({isPlaying}) => isPlaying ? 0 : 1};
`
export default class Overlay extends Component {
  componentDidMount() {
    this.main.addEventListener('click', (e) => {
      const centerX = this.main.offsetWidth / 2
      const isOnLeft = centerX > e.offsetX
      if (isOnLeft) {
        this.props.doBallLeft()
      } else {
        this.props.doBallRight()
      }
    })
  }

  render() {
    const { onPlayClick, isPlaying, score, bestScore, isFirstTime } = this.props
    return (
      <Main innerRef={main => {this.main = main}}>
        <Wrapper>
          <div>
            <Score>{score}</Score>
            <BestScore isPlaying={isPlaying}>Best: {bestScore}</BestScore>
            <Replay onClick={onPlayClick} isPlaying={isPlaying} isFirstTime={isFirstTime} />
            <Help isPlaying={isPlaying} >Objective: Catch same color balls to gain points, avoid balls with different colors.</Help>
            <Help isPlaying={isPlaying} >Use Arrow Left/Arrow Right ot Tap left/Tap Right on Screen to Rotate balls</Help>
          </div>
        </Wrapper>
      </Main>
    )
  }
}