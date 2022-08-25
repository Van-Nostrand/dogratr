import { useState, useEffect } from 'react'

interface IWindowSize {
  windowWidth: number;
  windowHeight: number;
}

export default function useWindowSize () {
  const [sizes, setSizes] = useState<IWindowSize>({ windowWidth: undefined, windowHeight: undefined })

  useEffect(() => {
    const setWindowSize = () => setSizes({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
    window.addEventListener('resize', setWindowSize)
    setWindowSize()
    return () => window.removeEventListener('resize', setWindowSize)
  }, [])

  return sizes
}
