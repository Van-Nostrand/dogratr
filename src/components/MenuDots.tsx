import React from 'react'
import '@/scss/components/menu-dots.scss'

interface MenuDotsProps {
  handleClick: () => void;
}

export default function MenuDots ({ handleClick }: MenuDotsProps) {
  return (
    <div
      className="menu-dots"
      onClick={handleClick}
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
