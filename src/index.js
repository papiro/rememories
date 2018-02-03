'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

class SigninWidget extends React.Component {
  render () {
    return <button data-href='/sign-in' className='{this.props.type}-button'></button>
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
