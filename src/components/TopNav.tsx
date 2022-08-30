import React from 'react'
import { Link } from 'react-router-dom'
import './topnav.scss'

export default function TopNav () {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.replace('/')
  }
  return (
    <nav className="top-nav">
      <div>topnav</div>
      <div className="top-nav__links">
        <Link to="/account">account</Link>
        <Link to="/ratr">Ratr</Link>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}
