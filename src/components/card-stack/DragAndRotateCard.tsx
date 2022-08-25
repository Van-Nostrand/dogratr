import React, { useRef, useEffect, useState } from 'react'
import useWindowSize from '@/hooks/useWindowSize'

interface DragAndRotateCardProps {
  children?: any;
  innerRef?: any;
}

export default function DragAndRotateCard ({ children, innerRef }: DragAndRotateCardProps) {
  const { windowWidth, windowHeight } = useWindowSize()

  const cardRef = innerRef ? innerRef : useRef(null)
  const [posX, setPosX] = useState<number>(0)
  const [posY, setPosY] = useState<number>(0)
  const [startX, setStartX] = useState<number>(0)
  const [startY, setStartY] = useState<number>(0)
  const [grabbed, setGrabbed] = useState<boolean>(false)
  const [rotation, setRotation] = useState<string>('0rad')
  const [cardX, setCardX] = useState<number>(0)
  const [cardY, setCardY] = useState<number>(0)
  const [origin, setOrigin] = useState<Array<number>>([0, 0])

  // positions rotation origin far beow card origin
  const ORIGIN_Y_BUFFER = 500

  useEffect(() => {
    centerCardInScreen()
  }, [])

  useEffect(() => {
    centerCardInScreen()
  }, [windowWidth, windowHeight])

  // const getRef = () => innerRef ? innerRef : cardRef

  const centerCardInScreen = () => {
    const { innerWidth } = window
    const { x, y, width } = getRekt()
    setCardX(x)
    setCardY(y)
    setOrigin([x, y + ORIGIN_Y_BUFFER])
    // set the card in the middle of the screen
    cardRef.current.style.left = `${(innerWidth / 2) - (width / 2)}px`
  }

  // bruh
  const getRekt = () => {
    return cardRef.current.getBoundingClientRect()
  }

  const handleMouseDown = (e: any) => {
    setGrabbed(true)
    setStartX(e.clientX - posX)
    setStartY(e.clientY - posY)
  }

  const handleMouseMove = (e: any) => {
    if (!grabbed) return
    const { x, y } = getRekt()
    const newX = e.clientX - startX
    const newY = e.clientY - startY
    setPosX(newX)
    setPosY(newY)
    setCardX(x)
    setCardY(y)
    setRotation(getRotation())
    setCardTransform()
  }

  const getRotation = () => {
    const [originX, originY] = origin
    const opposite = Math.abs(cardX - originX)
    const adjacent = Math.abs(cardY - originY)
    const rad = Math.atan(opposite / adjacent)
    if (cardX - originX < 0) {
      return `-${rad}rad`
    }
    return `${rad}rad`
  }

  const handleMouseUp = () => {
    setGrabbed(false)
  }

  const setCardTransform = () => {
    cardRef.current.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation})`
  }

  return (
    <div
      ref={cardRef}
      className="pup-card"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      { children }
    </div>
  )
}
