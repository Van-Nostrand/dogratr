import React, { useEffect, useRef } from 'react'
import { useWindowSize } from '@/hooks'

interface CardProps {
  children?: any;
  innerRef?: any;
}

export default function Card ({ children, innerRef }: CardProps) {
  const { windowWidth, windowHeight } = useWindowSize()
  const cardRef = innerRef ? innerRef : useRef(null)

  useEffect(() => {
    if (windowWidth > 0 && windowHeight > 0) centerCardInScreen()
  }, [windowWidth, windowHeight])

  const centerCardInScreen = () => {
    const { width } = getRekt()
    cardRef.current.style.left = `${(windowWidth / 2) - (width / 2)}px`
  }

  // bruh
  const getRekt = () => {
    return cardRef.current.getBoundingClientRect()
  }

  return (
    <div
      ref={cardRef}
      className="pup-card"
    >
      { children }
    </div>
  )
}
