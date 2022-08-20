import React from "react"
import { Link } from 'react-router-dom'

export default function LandingPage () {
  return (
    <div className="landing-page">
      <div className="landing-page__container">
        <Link
          to='/works'
          className="landing-title"
        >
          Annie Gallos
        </Link>
        <div className="link-container">
          <Link to='/about'>About</Link>
          <Link to='/works'>Works</Link>
          <Link to='/contact'>Contact</Link>
        </div>
      </div>
    </div>
  )
}
