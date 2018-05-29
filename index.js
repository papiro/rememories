import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Signin from './components/Signin.jsx'
import Home from './components/Home.jsx'
import Album from './components/Album.jsx'

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

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Signin}/>
        <Route path='/home' component={Home}/>
        <Route path='/album/:id' component={Album}/>
      </Switch>
    </Router>
  )
}


ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('app')
)
