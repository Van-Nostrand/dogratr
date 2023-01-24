import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setCheckingToken } from '@/store/auth/authSlice'
import { getAllCookies } from '@/functions/cookies'
import { checkUserToken } from '@/functions/authFunctions'
import { deleteCookie } from '@/functions/cookies'

export default function useAuth () {
  const dispatch = useDispatch()

  // check if data is a valid login
  const handleVerifyLogin = async (cookies: any) => {
    // console.log('HANDLE VERIFY LOGIN')
    dispatch(setCheckingToken(true))
    const tokenIsValid: boolean | Error = await checkUserToken()
    // console.log('token is valid?', tokenIsValid)
    if (tokenIsValid instanceof Error) {
      // clear cookies?
      deleteCookie('token')
      deleteCookie('email')
      deleteCookie('username')
    } else {
      setLogin(cookies)
    }

    dispatch(setCheckingToken(false))
  }

  // console.log('USE AUTH HOOK')

  // does not assume login is valid
  useEffect(() => {
    const cookies = getAllCookies()

    if (Object.keys(cookies).length > 0) {
      handleVerifyLogin(cookies)
    }
  }, [])

  // assumes login is valid
  const setLogin = (data: any) => {
    if (data !== null) {
      const today = new Date()
      const nextMonth = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate())
      const keys = ['token', 'username', 'email']
      keys.forEach(key => {
        if (data[key]) {
          document.cookie = `${key}=${data[key]};samesite=lax;expires=${nextMonth.toUTCString()}`
        } else {
          deleteCookie(key)
        }
      })
      // TODO email is missing
      console.log('useAuth.setLogin() ABOUT TO DISPATCH THIS:', data)
      dispatch(setLoggedIn({
        token: data.token,
        username: data.username,
        email: data.email
      }))
    }
  }

  return { setLogin }
}
