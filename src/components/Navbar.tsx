import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import useWindowSize from '@/functions/useWindowSize'
import MenuDots from '@/components/MenuDots'
import './navbar.scss'

export default function Navbar () {
  const current = useLocation()
  const windowSize = useWindowSize()
  const sub600 = windowSize.width < 600

  const [landingPage, setLandingPage] = useState<boolean>(true)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  useEffect(() => setLandingPage(current.pathname === '/'))

  const navbarLinksClass = `navbar__links${landingPage ? ' landing-nav-links' : ''}`
  const navbarTitleClass = `navbar__title${landingPage ? ' landing-nav-title' : ''}`

  const renderLinks = () => (
    <div
      className={navbarLinksClass}
      onClick={() => setOpenDrawer(false)}
    >
      {/* <Link to="/about">
        About
      </Link>
      <Link to="/works">
        Works
      </Link>
      <Link to="/contact">
        Contact
      </Link> */}
    </div>
  )

  const handleDotClick = () => {
    setOpenDrawer(!openDrawer)
  }

  const navMaskClass = openDrawer ? 'nav-mask nav-mask--open' : 'nav-mask'

  const navbarDrawerClass = `navbar__drawer${openDrawer ? ' navbar__drawer--open' : '' }`

  return (
    <nav className="navbar">
      <div className="relative-container">
        <div className="navbar__content">
          <Link
            to="/"
            className={navbarTitleClass}
          >
            { landingPage ? '' : 'Dogratr' }
          </Link>
          { sub600 ? <></> : renderLinks() }
          { sub600 ? <MenuDots handleClick={handleDotClick} /> : <></> }
          <div className="navbar__image">
          </div>
        </div>
        <div className={navbarDrawerClass}>
          { sub600 ? renderLinks() : <></> }
        </div>
        <div
          className={navMaskClass}
          onClick={() => setOpenDrawer(false)}
        />
      </div>
    </nav>
  )
}
