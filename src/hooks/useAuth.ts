import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setCheckingToken } from '@/store/auth/authSlice'
import { getAllCookies } from '@/functions/cookies'
import { checkUserToken } from '@/functions/authFunctions'
import { deleteCookie, setCookie } from '@/functions/cookies'

export default function useAuth () {
  const dispatch = useDispatch()

  // check if data is a valid login
  const handleVerifyLogin = async (cookies: any) => {
    console.log('handleVerifyLogin', cookies)
    dispatch(setCheckingToken(true))
    const tokenIsValid: boolean | Error = await checkUserToken()
    if (tokenIsValid instanceof Error) {
      console.log('tokenIsValid is not ok', tokenIsValid)
      // clear cookies?
      deleteCookie(['token', 'email', 'username'])
    } else {
      console.log('tokenIsValid is ok', tokenIsValid)
      setLogin(cookies)
    }

    console.log('dispatching checking token false')
    dispatch(setCheckingToken(false))
  }

  // does not assume login is valid
  useEffect(() => {
    const cookies = getAllCookies()
    console.log('setting up, got all cookies', cookies)

    if (Object.keys(cookies).length > 0) {
      handleVerifyLogin(cookies)
    }
  }, [])

  // assumes login is valid
  const setLogin = (data: any) => {
    console.log('setLogin,', data)
    if (data !== null) {
      const keys = ['token', 'username', 'email']
      keys.forEach(key => {
        if (data[key]) {
          setCookie({ name: key, value: data[key] })
        } else {
          deleteCookie(key)
        }
      })
      // TODO email is missing
      dispatch(setLoggedIn({
        token: data.token,
        username: data.username,
        email: data.email
      }))
    }
  }

  return { setLogin }
}
