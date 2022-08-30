import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { seedDB } from '@/store/pupper/pupperSlice'
import Account from '@/pages/Account'
import Ratr from '@/pages/Ratr'
import LandingPage from '@/pages/LandingPage'
import ThreeDTransformTest from '@/components/card-stack/ThreeDTransformTest'
import useWindowScrolling from '@/hooks/useWindowScrolling'
import Login from '@/pages/Login'
import TopNav from '@/components/TopNav'
import useToken from '@/hooks/useToken'


export default function App () {
  const dispatch = useDispatch()
  const { token, setToken } = useToken()

  useWindowScrolling()
  useEffect(() => {
    dispatch(seedDB())
  }, [])

  return (
    <div className="page-content">
      <TopNav />
      <div className="route-content">
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/ratr' element={<Ratr />} />
          <Route path='/test' element={<ThreeDTransformTest />} />
          <Route path='/account' element={ token ? <Account /> : <Navigate replace to='/login' />} />
          <Route path='/login' element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </div>
  )
}
