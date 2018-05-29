'use strict'

import React from 'react'
import DeleteAlbumButton from './DeleteAlbumButton.jsx'

function dateFormat (str) {
  return (new Date(str)).toLocaleString()
}

export default function AlbumRow ({ album, onDelete }) {
  return (
    <tr>
      <td><a href={"/album/" + album.id}>{album.name || album.id}</a></td>
      <td>{album.files}</td>
      <td>{dateFormat(album.created)}</td>
      <td className="row-actions">
        <DeleteAlbumButton 
          album_files={album.files} 
          album_id={album.id} />
      </td>
    </tr>
  )
}
