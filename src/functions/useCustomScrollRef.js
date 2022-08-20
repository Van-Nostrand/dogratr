import { useState, useLayoutEffect } from 'react'

//bufferValue is an integer defining the number of pixels past the target element that can be scrolled to before sending show=false
export default function useCustomScrollRef (bufferValue, initialScrollTarget = 0) {
  const [ show, doShow ] = useState(false)
  const [ scrollTarget, setScrollTarget ] = useState(initialScrollTarget + bufferValue)

  useLayoutEffect(() => {

    const onScroll = () => {

      //get the scroll position
      const currentScrollPosition = window.scrollY

      //see if the scroll position is past the target plus buffer
      if (scrollTarget <= currentScrollPosition) {
        doShow(true)
      }
      // if the scrollposition has not eclipsed the scroll target, do not show
      else if(scrollTarget > currentScrollPosition){
        doShow(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return show
}
