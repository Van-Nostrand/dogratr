import React, { useRef, useState } from 'react'

export default function Card () {
  const cardRef = useRef(null)
  const [posX, setPosX] = useState<number>(0)
  const [posY, setPosY] = useState<number>(0)
  const [startX, setStartX] = useState<number>(0)
  const [startY, setStartY] = useState<number>(0)
  const [grabbed, setGrabbed] = useState<boolean>(false)

  const handleMouseDown = (e: any) => {
    if (e.target === cardRef.current) {
      setGrabbed(true)
      setPosX(0)
      setPosY(0)
      setStartX(e.clientX)
      setStartY(e.clientY)
    }
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
    setPosX(0)
    setPosY(0)
    setStartX(0)
    setStartY(0)
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
      CARD
    </div>
  )
}
