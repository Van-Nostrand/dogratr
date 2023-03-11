import React from 'react'
import { Link } from 'react-router-dom'

interface GoBackArrowProps {
  to: string
}

export default function GoBackArrow (props: GoBackArrowProps) {
  return (
    <Link
      className="go-back-arrow"
      to={props.to}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 50 40"
      >
        <line
          x1="12"
          y1="25"
          x2="38"
          y2="12"
          stroke="#333"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <line
          x1="12"
          y1="25"
          x2="38"
          y2="38"
          stroke="#333"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
      <div>back</div>
    </Link>
  )
}

GoBackArrow.defaultProps = {
  to: '/'
}
