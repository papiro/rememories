'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import AlbumRow from './AlbumRow.jsx'
import data from './data'

export default class AlbumTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = { albums: data.albums }
  }
  render () {
    const { albums } = this.state
    return (
    	<section className="album-section">
	      <table className="album-table">
          <thead><tr><th>Album</th><th>Files</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody>
	        {albums.length ? 
	          albums.map( album => 
	            <AlbumRow key={album.id} album={album} />
	          )
	          : <tr><td colSpan="4">No albums. Create one!</td></tr>
	        } 
          </tbody>
	      </table>
	      <button onClick={this.addAlbum.bind(this)} className="add-album"></button>
      </section>
    )
  }
  getChildContext () {
    return {
      deleteRow: this.deleteRow.bind(this)
    }
  }
  deleteRow (album_id) {
    this.setState( (state, props) => {
      return { albums: state.albums.filter( album => album.id !== album_id ) }
    })
  }
  addAlbum (evt) {
    fetch('/album', {
      method: 'POST',
      credentials: 'same-origin'
    }).then( res => {
      if (res.redirected) return window.location = res.url
      res.json().then( data => { this.setState({ albums: data.albums }) })
    }).catch(console.error)
  }
}

AlbumTable.childContextTypes = {
  deleteRow: PropTypes.func
}
