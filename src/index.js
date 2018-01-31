'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

class SigninWidget extends React.Component {
  render () {
    return <button data-href='/sign-in' class='{this.props.type}-button'></button>
  }
}

class Signin extends React.Component {
  render () {
    return (
      <main>
        <h2>Sign-in with</h2>
        <div class='signin-widgets'>
          <SigninWidget type='google'>
          <SigninWidget type='facebook'>
        </div>
      </main>
    )
  }
}

ReactDOM.render(
  <Signin>,
  document.getElementById('app')
)
