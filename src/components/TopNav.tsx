import React from 'react'
import { Link } from 'react-router-dom'
import { useShallowEqualSelector } from '@/hooks'
import { IRootStore } from '@/store/types'
import './topnav.scss'

export default function TopNav () {
  const { isLoggedIn } = useShallowEqualSelector((state: IRootStore) => ({
    isLoggedIn: state.auth.isLoggedIn
  }))

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

        { isLoggedIn
          ? <button onClick={handleLogout}>Logout</button>
          : <Link to="/login">Login</Link>
        }

      </div>
    </nav>
  )
}
