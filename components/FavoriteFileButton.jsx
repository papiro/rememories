import React from 'react'
import PropTypes from 'prop-types'
import LocalStorage from './LocalStorage.jsx'

export default class FavoriteFileButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { favorite: false }
  }
  render () {
    return (
      <React.Fragment>
        <LocalStorage 
          _key={this.props.fileid + this.props.filename}
          from={this.state} 
          to={this.setState.bind(this)} />
        <button 
          className={"icon favorite" + ( this.state.favorite ? "-active" : "" )}
          onClick={() => { this.setState({ favorite: !this.state.favorite })}}
         />
      </React.Fragment>
    )
  }
}

FavoriteFileButton.contextTypes = {
  setFileState: PropTypes.func
}
