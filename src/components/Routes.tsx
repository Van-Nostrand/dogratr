import React, { useEffect } from 'react'
import {
  Routes,
  Route
  // useLocation
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { seedDB } from '@/store/pupper/pupperSlice'
import Account from '@/pages/Account'
import Ratr from '@/pages/Ratr'
import LandingPage from './LandingPage'
import ThreeDTransformTest from '@/components/card-stack/ThreeDTransformTest'
import useWindowScrolling from '@/hooks/useWindowScrolling'

// const SCROLL_TOP_EXCEPTIONS = [
//   '/works'
// ]

export default function App () {
  // const location = useLocation()
  useWindowScrolling()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(seedDB())
  }, [])

  // useEffect(() => {
  //   if (!SCROLL_TOP_EXCEPTIONS.includes(location.pathname)) {
  //     window.scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: 'smooth'
  //     })
  //   }
  // }, [location.pathname])

  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path='/ratr' element={<Ratr />} />
      <Route path='/test' element={<ThreeDTransformTest />} />
      <Route path='/account' element={<Account />} />
    </Routes>
  )
}
