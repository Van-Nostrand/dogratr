import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '@/store/auth/authSlice'
import { useShallowEqualSelector } from '@/hooks'
import { deleteCookie } from '@/functions/cookies'
import { IRootStore } from '@/store/types'
import './topnav.scss'

export default function TopNav () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { verifiedLogin } = useShallowEqualSelector((state: IRootStore) => ({
    verifiedLogin: state.auth.verifiedLogin
  }))

  const handleLogout = () => {
    deleteCookie('token')
    deleteCookie('email')
    deleteCookie('username')
    dispatch(logOut())
    navigate('/')
  }

  return (
    <nav className="top-nav">
      <div className="top-nav__links">
        <Link to="/account">account</Link>
        <Link to="/ratr">Ratr</Link>
        <Link to="/">Home</Link>

        {
          verifiedLogin
            ? <button onClick={handleLogout}>Logout</button>
            : <Link to="/login">Login</Link>
        }

      </div>
    </nav>
  )
}
