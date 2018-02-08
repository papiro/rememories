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

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }
  componentDidCatch (err, info) {
    console.trace(err)
    console.info(info.componentStack)
    this.setState({ hasError: true })
  }
  render () {
    if (this.state.hasError)
      return <h1>Foo my bar, there was an error!</h1>
    else
      return this.props.children
  }
}

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Signin}/>
          <Route path='/home/:id' component={Home}/>
        {/*<Route path='/dashboard/:id' component={Dashboard}/>*/}
        </Switch>
      </Router>
    )
  }
}


ReactDOM.render(
  <ErrorBoundary>
    <App></App>
  </ErrorBoundary>,
  document.getElementById('app')
)
