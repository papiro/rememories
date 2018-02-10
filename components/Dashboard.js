'use strict'

import { Component } from 'react'
import data from './data'

console.log(data)

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    <main>
      <ul className="actions-panel">
        <li><a className="icon--home" href="/home/{data.user_id}"></a></li>
        <li><button className="icon--invite-user"></button></li>
        <li><button className="icon--remove-user"></button></li>
        <li><button className="icon--upload"></button></li>
        <li><button className="icon--filter"></button></li>
        <li><button className="icon--favorites"></button></li>
        <li><button className="icon--logout"></button></li>
      </ul>
      <FilesTable />
    </main>
  }
}

class FilesTable extends Component {
  constructor (props) {
    super(props)
    this.state = { files: data.files }
  }
  render () {
    const { files } = this.state
    return (
      <table>
        <FilesTableHeader />
        <tbody>
          { files.length ?
            files.map( file => (
              <FileRow file={file} />              
            ))
          :
            <tr><td colspan="5">No files added yet.</td></tr>
          }
        </tbody>
      </table>
    )
  }
}

class FilesTableHeader extends Component {
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

class FileRow extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { file } = this.props
    return (
      <tr>
        <th>{file.name}</th>
        <th>{file.date}</th>
        <th>{file.size}</th>
        <th>{file.length}</th>
        <th><FavoriteFileButton /><DeleteFileButton /></th>
      </tr>
    )
  }
}

class FavoriteFileButton extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <button>fav</button>
  }
}

class DeleteFileButton extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <button>del</button>
  }
}

