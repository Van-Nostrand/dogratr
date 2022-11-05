import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setCheckingToken } from '@/store/auth/authSlice'
import getCookies from '@/functions/getCookies'
import { checkUserToken } from '@/functions/authFunctions'
// import { useShallowEqualSelector } from '@/hooks'
// import { IRootStore } from '@/store/types'

export default function useAuth () {
  const dispatch = useDispatch()

  // check if data is a valid login
  const handleAutomaticLogin = async (cookies: any) => {
    dispatch(setCheckingToken(true))
    const tokenIsValid: boolean | Error = await checkUserToken()
    console.log('token is valid?', tokenIsValid)
    if (tokenIsValid instanceof Error) {
      // clear cookies?
    } else {
      saveLogin(cookies)
    }
    dispatch(setCheckingToken(false))
  }

  // does not assume login is valid
  useEffect(() => {
    const cookies = getCookies()

    if (Object.keys(cookies).length > 0) {
      handleAutomaticLogin(cookies)
    }
  }, [])

  // assumes login is valid
  const saveLogin = (data: any) => {
    if (data !== null) {
      const today = new Date()
      const nextMonth = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate())
      const keys = ['token', 'username', 'email']
      keys.forEach(key => {
        if (data[key]) {
          document.cookie = `${key}=${data[key]};samesite=lax;expires=${nextMonth.toUTCString()}`
        } else {
          document.cookie = `${key}=;path=/;expires=${new Date(0).toUTCString()};`
        }
      })

      dispatch(setLoggedIn({
        token: data.token,
        username: data.username,
        email: data.email
      }))
    }
  }

  return { setLogin: saveLogin }
}
