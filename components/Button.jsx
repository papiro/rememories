'use strict'

import React from 'react'

export default function Button (props) {
  return <li><button onClick={props.onClick} className={"icon "+props.action}><span className="button-label">{props.action}</span></button></li>
}