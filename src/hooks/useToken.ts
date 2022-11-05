import { useState } from 'react'

export default function useToken () {
  const getToken = () => {
    const cookies = Object.fromEntries(document.cookie.split('; ').reduce((acc, cur) => {
      if (/=/.test(cur)) {
        acc.push(cur.split('='))
      }
      return acc
    }, []))
    console.log('what is cookies?', cookies)
    return cookies?.token
  }
  const [token, setToken] = useState(getToken())

  const saveToken = (userToken: any) => {
    const today = new Date()
    const nextMonth = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate())
    document.cookie = `token=${userToken || ''};samesite=lax;expires=${nextMonth.toUTCString()}`
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token
  }
}
