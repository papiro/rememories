/*
* Takes two props, of the form <LocalStorage from={this.state} to={this.setState} />
*   It just needs handles to your component's state to facilitate two-way-data-binding
*   between the component's state and localStorage.
*/
import React from 'react'

export default class LocalStorage extends React.Component {
  constructor (props) {
    super(props)
    let item = localStorage.getItem(props._key)
    try {
      item = JSON.parse(item)
    } catch (e) {} finally {
      props.to(item)
    }
  }
  render () {
    return null
  }
  shouldComponentUpdate () {
    return true
  }
  componentWillReceiveProps (props) {
    const item = props.from instanceof Object ? JSON.stringify(props.from) : props.from
    localStorage.setItem(this.props._key, item)
  }
}