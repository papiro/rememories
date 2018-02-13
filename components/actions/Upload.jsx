'use strict'

import React from 'react'
import PropTypes from 'prop-types'

export default class UploadAction extends React.PureComponent {
  render () {
    return (
      <li>
        <form ref={(form) => { this.form = form }} action="/files" encType="multipart/form-data" method="post">
          <label className="icon upload" htmlFor="files"><span className="button-label">upload</span></label>
          <input 
            hidden multiple 
            accept="image/*, video/*"
            type="file" 
            name="files" 
            id="files" 
            onChange={this.uploadFiles.bind(this)} />
        </form>
      </li>
    )
  }
  uploadFiles ({ target }) {
    const formData = new FormData(this.form)
    const files = Array.from(target.files)
    const filedata = files.map( file => {
      console.log(file)
      formData.append(file.filename, file.lastModified)
      formData.append(file.filename, file.size)
      return {
        filename: file.name,
        size: file.size
      }
    })
    fetch('/files', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    }).then( res => {
      res.json()
        .then( res => {
          res.status.forEach( (result, i) => {
            filedata[i].id = result.id
          })
          console.log(filedata)
          this.context.addRows(filedata)
        })
    }).catch(console.error)
  }
}

UploadAction.contextTypes = {
  addRows: PropTypes.func
}