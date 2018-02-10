'use strict'

import { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Modal extends Component {
  constructor (props) {
    super(props)
    this.modal = (
      <div style={{
        width: '100vw',
        height: '100vh',
        'background-color': 'rgba(255, 255, 255, 0.4)'
      }}>
        <div style={{
          'max-height': '90vh',
          'max-width': '90vw'
        }}>
          <span style={{
            'background-image': `url('data:image/svg+xml;utf8,<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="icon-shape"><polygon id="Combined-Shape" points="10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644"></polygon></g></g></svg>')`,
            height: '2.5em',
            width: '2.5em'
          }} onClick={this.props.onClose}></span>
        </div>
      </div>
    )
    this.body = document.getElementsByTagName('body')[0]
  }
  componentDidMount () {
    this.body.appendChild(this.modal) 
  }
  componentWillUnmount () {
    this.body.removeChild(this.modal)
  }
  render () {
    return ReactDOM.createPortal(this.props.children, this.modal)
  }
}
