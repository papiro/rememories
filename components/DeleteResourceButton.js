'use strict'

import React from 'react'
import Modal from './Modal'

export default class extends React.Component {
	constructor (props) {
    super(props)
    this.state = { showConfirm: false }
	}
  render () {
    const { confirm: hasConfirm } = this.props
    return (
      <button onClick={hasConfirm ? () => { this.setState({ showConfirm: true }) } : this.props.onDelete} className={this.props.className}>
      { hasConfirm && this.state.showConfirm &&
        <Modal onClose={this.closeConfirm.bind(this)}>
          <h1>Are you sure?</h1> 
          {this.props.children}
          <button onClick={this.props.onDelete}>Yes</button><button onClick={this.closeConfirm.bind(this)}>No</button>
        </Modal>
      }
      </button>
    )
  }
  closeConfirm (evt) {
    evt.stopPropagation()
    this.setState({ showConfirm: false })
  }
}
