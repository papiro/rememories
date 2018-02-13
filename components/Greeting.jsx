'use strict'

import React from 'react'
import data from './data'

export default class Greeting extends React.Component {
	constructor	(props) {
		super(props)
		this.state = { name: data.name }
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	render () {
		if (this.state.name) 
			return <h2 className="greeting">Hi {this.state.name}!</h2>
		else {
			return (
				<form onSubmit={this.onSubmit}>
					<h2>Hi 
						<input type="text"placeholder="Enter your name"value={this.state.name} onChange={this.onChange}/>
						<button type="submit">check</button> !
          </h2>
        </form>
      )
		}
	}
	onChange ({ target }) {
		this.setState({ name: target.value })
	}
	onSubmit ({ target }) {
    fetch(`/api/userInfo/${data.id}`, {
      method: 'POST',
      body: JSON.stringify({ name: this.state.name }),
      headers: { 
        'Content-Type': 'application/json',
        credentials: 'same-origin'
      }
    }).then(console.log).catch(console.error)
	}
}

