import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Account from '@/pages/Account'
import Ratr from '@/pages/Ratr'
import LandingPage from '@/pages/LandingPage'
import CreatePupper from '@/pages/CreatePupper'
import Login from '@/pages/Login'
import ThreeDTransformTest from '@/components/card-stack/ThreeDTransformTest'
import TopNav from '@/components/TopNav'
import ProtectedRoute from '@/hocs/ProtectedRoute'
import { useWindowScrolling, useAuth, useShallowEqualSelector } from '@/hooks'
// import { seedDB } from '@/store/pupper/pupperSlice'
// import { setHistory } from '@/store/rating/ratingSlice'
// import { fetchRatingsForUser } from '@/functions/authFunctions'
import { IRootStore } from '@/store/types'

export default function App () {
  // const dispatch = useDispatch()
  const {
    verifiedLogin,
    checkingToken,
    // username,
    // email
  } = useShallowEqualSelector((state: IRootStore) => ({
    verifiedLogin: state.auth.verifiedLogin,
    checkingToken: state.auth.checkingToken,
    // username: state.auth.username,
    // email: state.auth.email
  }))
  const { setLogin } = useAuth()

  useWindowScrolling()

  // useEffect(() => {
  //   // dispatch(seedDB())
  //   // load ratings from the db
  //   if (verifiedLogin && !checkingToken && username && email) {
  //     fetchRatingsForUser({ username: 'mike' })
  //       .then((res) => {
  //         dispatch(setHistory(res))
  //       })
  //   }
  // }, [verifiedLogin, checkingToken, username, email])

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
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login setLogin={setLogin} />} />
          <Route
            path='/create-pupper'
            element={
              <ProtectedRoute>
                <CreatePupper />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!verifiedLogin && !checkingToken && <div>logged out popup</div>}
      </div>
    </div>
  )
}
