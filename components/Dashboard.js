'use strict'

import React from 'react'
import Modal from './Modal'
import data from './data'

console.log(data)

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { files: data.files }
  }
  render () {
    const { files } = this.state
    return (
      <main>
        <ActionsPanel addFiles={this.addFiles.bind(this)}/>
        <FilesTable files={files} />
      </main>
    )
  }
  addFiles (arr) {
    this.setState({ files: this.state.files.concat(arr) })
  }
}

class ActionsPanel extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <ul className="actions-panel">
        <HomeAction />
        <li><button onClick={this.handleInviteUser} className="icon invite-user"></button></li>
        <li><button onClick={this.handleRemoveUser} className="icon remove-user"></button></li>
        <UploadAction {...this.props}/>
        <li><button onClick={this.handleFilter} className="icon filter"></button></li>
        <li><button onClick={this.handleFavorites} className="icon favorites"></button></li>
        <li><button onClick={this.handleLogout} className="icon logout"></button></li>
      </ul>
    )
  }
}
function Button (props) {
  return <li><button onClick={props.onClick} className={"icon "+props.action}><span className="button-label">{props.action}</span></button></li>
}
class HomeAction extends React.Component {
  render () {
    return (
      <Button action="home" onClick={() => {
        window.location = `/home/${data.user_id}`
      }} />
    )
  }
}
class UploadAction extends React.Component {
  constructor (props) {
    super(props)
  }
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
      console.log(res)
      this.props.addFiles(filedata)
    }).catch(console.error)
    //this.form.submit()
  }
}

class FilesTable extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { files } = this.props
    return (
      <table className="files-table">
        <FilesTableHeader />
        <tbody>
          { files.length ?
            files.map( file => (
              <FileRow key={file.filename} file={file} />              
            ))
          :
            <tr><td className="no-files" colSpan="5">No files added yet.</td></tr>
          }
        </tbody>
      </table>
    )
  }
}

class FilesTableHeader extends React.Component {
  constructor (props) {
    super(props)
    this.sortBy = this.sortBy.bind(this)
  }
  render () {
    return (
      <thead>
        <tr>
          <th><button onClick={this.sortBy} data-type="name"   className="sort"><span className="icon--sort"></span>Name</button></th>
          <th><button onClick={this.sortBy} data-type="date"   className="sort"><span className="icon--sort"></span>Date</button></th>
          <th><button onClick={this.sortBy} data-type="size"   className="sort"><span className="icon--sort"></span>Size</button></th>
          <th><button onClick={this.sortBy} data-type="length" className="sort"><span className="icon--sort"></span>Length</button></th>
          <th>Actions</th>
        </tr>
      </thead>
    )
  }
  sortBy (evt) {
    const { type } = evt.target.datalist
    let cmpfn
    switch (type) {
      case 'name':
        cmpfn = (a, b) => {
          const aname = a.name.toUpperCase(), bname = b.name.toUpperCase()
          return (aname < bname) ? -1
               : (aname > bname) ? 1
               : 0
        }
        break
      case 'date':
        cmpfn = (a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
        break
      case 'size':
        cmpfn = (a, b) => a.size - b.size
        break
      case 'length':
        cmpfn = (a, b) => a.length - b.length
        break
      default:
        console.error(`File-table header of type ${type} not accounted for.`)
    }
    this.setState({ files: this.state.files.sort(cmpfn) })
  }
}

class FileRow extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { file } = this.props
    return (
      <tr>
        <th>{file.filename}</th>
        <th>{file.date}</th>
        <th>{file.size}</th>
        <th>{file.length}</th>
        <th><FavoriteFileButton /><DeleteFileButton /></th>
      </tr>
    )
  }
}

class FavoriteFileButton extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <button>fav</button>
  }
}

class DeleteFileButton extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <button>del</button>
  }
}

