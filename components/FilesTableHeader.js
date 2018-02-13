import React from 'react'

export default class FilesTableHeader extends React.PureComponent {
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