import React from 'react'
import PropTypes from 'prop-types'

export default class FavoriteFileButton extends React.PureComponent {
  render () {
    return (
      <button 
        className={"icon " + ( this.props.favorite ? "favorite-active" : "favorite" )}
        onClick={this.context.setFileState.bind(this, this.props.fileid, { favorite: true })}
       />
    )
  }
}

FavoriteFileButton.contextTypes = {
  setFileState: PropTypes.func
}
