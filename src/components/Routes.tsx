import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

// import About from '@/components/About'
// import Details from './Details'
// import Contact from './Contact'
// import ImageGallery from './ImageGallery'
import Ratr from '@/components/Ratr'
import LandingPage from './LandingPage'
import ThreeDTransformTest from '@/components/card-stack/ThreeDTransformTest'

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
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path='/ratr' element={<Ratr />} />
      <Route path='/test' element={<ThreeDTransformTest />} />
      {/* <Route path='/about' element={<About />} /> */}
      {/* <Route path='/works' element={<ImageGallery />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/details/:name' element={<Details />} /> */}
    </Routes>
  )
}
