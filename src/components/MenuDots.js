import React from 'react'
import '@/scss/components/menu-dots.scss'

export default function MenuDots (props) {
  return (
    <div
      className="menu-dots"
      onClick={props.handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 120 20"
      >
        <circle cx="10" cy="10" r="10" fill="#ececec" />
        <circle cx="60" cy="10" r="10" fill="#ececec" />
        <circle cx="110" cy="10" r="10" fill="#ececec" />
      </svg>
    </div>
  )
}
