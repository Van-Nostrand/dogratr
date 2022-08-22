import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage () {
  return (
    <div className="landing-page">
      <div className="landing-page__container">
        <Link
          to='/ratr'
          className="landing-title"
        >
          DOG RATR
        </Link>
        <div className="link-container">
          <Link to='/ratr'>Woof</Link>
        </div>
      </div>
    </div>
  )
}
