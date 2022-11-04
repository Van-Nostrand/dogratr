import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Account from '@/pages/Account'
import Ratr from '@/pages/Ratr'
import LandingPage from '@/pages/LandingPage'
import Login from '@/pages/Login'
import ThreeDTransformTest from '@/components/card-stack/ThreeDTransformTest'
import TopNav from '@/components/TopNav'
import ProtectedRoute from '@/hocs/ProtectedRoute'
import { useToken, useWindowScrolling } from '@/hooks'
import { seedDB } from '@/store/pupper/pupperSlice'


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
          <Route
            path='/account'
            element={
              <ProtectedRoute isAuthenticated={token}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </div>
  )
}
