import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SCROLL_TOP_EXCEPTIONS = [
  '/works',
  '/ratr'
]

// scrolls to the top of any page not in the list above
export default function useWindowScrolling () {
  const location = useLocation()
  return useEffect(() => {
    if (!SCROLL_TOP_EXCEPTIONS.includes(location.pathname)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // remember this doesn't work in safari
      })
    }
  }, [location.pathname])
}
