'use strict'

import React from 'react'
import Button from '../Button.jsx'

export default class HomeAction extends React.PureComponent {
  render () {
    return (
      <Button action="home" onClick={() => {
        window.location = `/home`
      }} />
    )
  }
}
