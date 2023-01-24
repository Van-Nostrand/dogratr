import React from 'react'
import './TextInput.scss'

export default function TextInput (props: any) {
  return (
    <div className="textinput">
      <span>{props.label}</span>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  )
}
