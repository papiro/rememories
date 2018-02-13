'use strict'

import React from 'react'
import Home from './actions/Home.jsx'
import Upload from './actions/Upload.jsx'

export default class ActionsPanel extends React.PureComponent {
  render () {
    return (
      <ul className="actions-panel">
        <Home />
        <li><button onClick={this.handleInviteUser} className="icon invite-user"></button></li>
        <li><button onClick={this.handleRemoveUser} className="icon remove-user"></button></li>
        <Upload {...this.props}/>
        <li><button onClick={this.handleFilter} className="icon filter"></button></li>
        <li><button onClick={this.handleFavorites} className="icon favorites"></button></li>
        <li><button onClick={this.handleLogout} className="icon logout"></button></li>
      </ul>
    )
  }
}
