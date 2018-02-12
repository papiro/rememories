'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

export default class Modal extends React.Component {
  constructor (props) {
    super(props)
    const container = document.createElement('div')
    container.setAttribute('class', 'modal-container')
    container.setAttribute('style', `
      position: absolute;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
    `)
    this.container = container
    this.body = document.getElementsByTagName('body')[0]
  }
  componentDidMount () {
    this.body.appendChild(this.container) 
  }
  componentWillUnmount () {
    this.body.removeChild(this.container)
  }
  render () {
    const Content = <ModalFrame {...this.props} />
    return ReactDOM.createPortal(Content, this.container)
  }
}

function ModalFrame (props) {
  return (
    <div style={{
      position: "relative",
      height: "80vh",
      width: "80vw",
      backgroundColor: "white"
    }}>
      <span style={{
				display: "inline-block",
				fontSize: "6em",
				position: "absolute",
				right: "-10px",
				top: "-22px"
      }} onClick={props.onClose}>&#x022A0;</span>
      {props.children}
    </div>
  )
}
