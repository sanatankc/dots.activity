import React, { Component } from 'react'
import styled from 'styled-components'
import Canvas from './components/Canvas'

const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: calc(100vh - 55px);
  width: 100vw;
`

class App extends Component {
  render() {
    return (
      <Main>
        <Canvas />
      </Main>
    )
  }
}

export default App