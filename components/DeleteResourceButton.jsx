import React from 'react'
import Modal from './Modal.jsx'

export default class extends React.PureComponent {
	constructor (props) {
    super(props)
    this.state = { showConfirm: false }
	}
  render () {
    const { confirm: hasConfirm } = this.props
    return (
      <button 
        onClick={hasConfirm ? () => { this.setState({ showConfirm: true }) } : this.props.onDelete} 
        className={this.props.className || "icon delete"}>
      { hasConfirm && this.state.showConfirm &&
        <Modal onClose={this.closeConfirm.bind(this)}>
          <h1>Are you sure?</h1> 
          {this.props.children}
          <button onClick={this.onClickYes.bind(this)}>Yes</button>
          <button onClick={this.closeConfirm.bind(this)}>No</button>
        </Modal>
      }
      </button>
    )
  }
  onClickYes (evt) {
    this.props.onDelete(evt)
    this.closeConfirm(evt)
  }
  closeConfirm (evt) {
    evt.stopPropagation()
    this.setState({ showConfirm: false })
  }
}
