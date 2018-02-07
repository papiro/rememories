'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Signin from './components/Signin'
import Home from './components/Home'
//import Dashboard from './components/Dashboard'

class App extends React.Component {
  render () {
    return (
      <main>
        <Router>
          <Switch>
            <Route path='/' component={Signin}/>
            <Route path='/home/:id' component={Home}/>
          {/*<Route path='/dashboard/:id' component={Dashboard}/>*/}
          </Switch>
        </Router>
      </main>
    )
  }
}


ReactDOM.render(
  <App></App>,
  document.getElementById('app')
)
