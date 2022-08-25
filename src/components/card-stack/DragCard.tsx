import React, { useRef, useState } from 'react'

interface DragCardProps {
  children?: any;
}

export default function DragCard ({ children }: DragCardProps) {
  const cardRef = useRef(null)
  const [posX, setPosX] = useState<number>(0)
  const [posY, setPosY] = useState<number>(0)
  const [startX, setStartX] = useState<number>(0)
  const [startY, setStartY] = useState<number>(0)
  const [grabbed, setGrabbed] = useState<boolean>(false)

  const handleMouseDown = (e: any) => {
    setGrabbed(true)
    setStartX(e.clientX - posX)
    setStartY(e.clientY - posY)
  }

  const handleMouseMove = (e: any) => {
    if (!grabbed) return
    const newX = e.clientX - startX
    const newY = e.clientY - startY

    setPosX(newX)
    setPosY(newY)
    setCardTransform()
  }

  const handleMouseUp = () => {
    setGrabbed(false)
  }

  const setCardTransform = () => {
    cardRef.current.style.transform = `translate(${posX}px, ${posY}px)`
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
