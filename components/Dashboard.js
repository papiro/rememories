'use strict'

import React from 'react'
import data from './data'

console.log(data)

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <h1>Dashboard::{this.props.match.id}</h1>
  }
}
