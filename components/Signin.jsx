'use strict'

import React from 'react'

function SigninWidget (props) {
  return <a href={'/sign-in/' + props.type} className={props.type + '-button'}></a>
}

export default function () {
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
