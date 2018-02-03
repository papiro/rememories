'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

class SigninWidget extends React.Component {
  render () {
    return (
      <a href={'/sign-in/' + this.props.type} className={this.props.type + '-button'}></a>
    )
  }
}

class Signin extends React.Component {
  render () {
    return (
      <main>
        <h2>Sign-in with</h2>
        <div className='signin-widgets'>
          <SigninWidget type='google'></SigninWidget>
          <SigninWidget type='facebook'></SigninWidget>
        </div>
      </main>
    )
  }
}

ReactDOM.render(
  <Signin></Signin>,
  document.getElementById('app')
)