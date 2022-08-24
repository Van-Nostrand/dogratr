import React, { useRef, useEffect, useState } from 'react'

export default function DragAndRotateCard () {
  const cardRef = useRef(null)
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
    const { x, y } = cardRef.current.getBoundingClientRect()
    setCardX(x)
    setCardY(y)
    setOrigin([x, y + ORIGIN_Y_BUFFER])
  }, [])

  const handleMouseDown = (e: any) => {
    if (e.target === cardRef.current) {
      setGrabbed(true)
      setStartX(e.clientX)
      setStartY(e.clientY)
    }
  }

  const handleMouseMove = (e: any) => {
    if (!grabbed) return
    const { x, y } = cardRef.current.getBoundingClientRect()
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
    setStartX(0)
    setStartY(0)
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
      CARD
    </div>
  )
}
