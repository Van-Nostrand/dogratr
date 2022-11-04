import React, { useRef, useEffect, useState } from 'react'
import { useWindowSize } from '@/hooks'

interface DragAndRotateCardProps {
  children?: any;
  innerRef?: any;
  className?: string;
}

export default function DragAndRotateCard ({ children, innerRef, className }: DragAndRotateCardProps) {
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
  const [cardWidth, setCardWidth] = useState<number>(0)
  const [origin, setOrigin] = useState<Array<number>>([0, 0])

  // positions rotation origin far beow card origin
  const ORIGIN_Y_BUFFER = 500

  useEffect(() => {
    console.log('init useeffect')
    if (cardWidth === 0) {
      setCardWidth(getRekt().width)
    }
    centerCardInScreen()
  }, [])

  useEffect(() => {
    centerCardInScreen()
  }, [windowWidth, windowHeight])

  const centerCardInScreen = () => {
    const { innerWidth } = window
    const { x, y } = getRekt()
    setCardX(x)
    setCardY(y)
    setOrigin([x, y + ORIGIN_Y_BUFFER])
    console.log('card width?', cardWidth, 'inner?', innerWidth)
    const leftamt = `${(innerWidth / 2) - (372 / 2)}px`
    // set the card in the middle of the screen
    cardRef.current.style.left = leftamt
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
    updateCardPosition()
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

  const updateCardPosition = () => {
    console.log('UPDATE CARD POSITION')
    cardRef.current.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation})`
  }

  const classList = ['pup-card', className ? className : ''].join(' ')

  return (
    <div
      ref={cardRef}
      className={classList}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      { children }
    </div>
  )
}
