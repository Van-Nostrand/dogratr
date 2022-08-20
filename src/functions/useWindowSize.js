import React, { useState, useEffect } from 'react'

export default function useWindowSize () {
  const [ windowSize, setWindowSize ] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    function resizeEvent() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener('resize', resizeEvent)

    resizeEvent()
    return () => window.removeEventListener('resize', resizeEvent)
  }, [])

  return windowSize
}
