import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

import About from '@/components/About'
import Details from './Details'
import Navbar from './Navbar'
import Contact from './Contact'
import ImageGallery from './ImageGallery'
import LandingPage from './LandingPage'

import {
  ART_DATA
} from '@/constants/CONSTANTS'

const SCROLL_TOP_EXCEPTIONS = [
  '/works'
]

export default function App () {
  const location = useLocation()
  useEffect(() => {
    if (!SCROLL_TOP_EXCEPTIONS.includes(location.pathname)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <div className='content-container'>
        <Routes>
          <Route
            exact
            path='/'
            element={<LandingPage />}
          />
          <Route
            path='/about'
            element={
              <About />
            }
          />
          <Route
            path='/works'
            element={
              <ImageGallery />
            }
          />
          <Route
            path='/contact'
            element={<Contact />}
          />
          <Route
            path='/details/:name'
            element={<Details />}
          />
        </Routes>
      </div>
    </>
  )
}


