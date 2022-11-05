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
import { useWindowScrolling, useShallowEqualSelector, useAuth } from '@/hooks'
import { seedDB } from '@/store/pupper/pupperSlice'
import { IRootStore } from '@/store/types'

export default function App () {
  const dispatch = useDispatch()
  const { isLoggedIn } = useShallowEqualSelector((state: IRootStore) => ({
    isLoggedIn: state.auth.isLoggedIn
  }))
  const { setLogin } = useAuth()

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
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login setLogin={setLogin} />} />
        </Routes>
      </div>
    </div>
  )
}
