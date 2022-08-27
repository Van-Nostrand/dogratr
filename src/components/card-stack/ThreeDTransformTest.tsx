import React, { useState, useEffect, forwardRef, useRef } from 'react'
import DragCard from './DragCard'
import useWindowSize from '@/hooks/useWindowSize'
import './three-d-test.scss'

export default function ThreeDTransformTest () {
  const { windowWidth, windowHeight } = useWindowSize()

  const card1 = useRef(null)
  const card2 = useRef(null)
  // const [posX, setPosX] = useState(0)
  // const [posY, setPosY] = useState(0)
  const [card1X, setCard1X] = useState<number>(0)
  const [card1Y, setCard1Y] = useState<number>(0)
  const [card2X, setCard2X] = useState<number>(0)
  const [card2Y, setCard2Y] = useState<number>(0)
  const [animateForwards, setAnimateForwards] = useState<boolean>(true)
  // const [origin, setOrigin] = useState<Array<number>>([0, 0])

  // positions rotation origin far beow card origin
  // const ORIGIN_Y_BUFFER = 500
  const PATH_MULTIPLIER = 25

  useEffect(() => {
    centerCardInScreen()
  }, [])

  useEffect(() => {
    centerCardInScreen()
  }, [windowWidth, windowHeight])

  const generateKeyframes = () => {
    const parab = generatePath(inverseParab)
    const polynom = generatePath(inverseCubic)
    const numSteps = Math.max(parab.length, polynom.length)
    const keyframes = []

    for (let x = 0; x < numSteps; x++) {
      keyframes[x] = { transform: `translate(${parab[x]*PATH_MULTIPLIER}px, ${polynom[x]*PATH_MULTIPLIER}px)` }
    }

    // console.log('generated keyframes are', keyframes)
    return keyframes
  }

  const inverseParab = (x: number) => (-1 * x**2) + (2*x)
  const inverseCubic = (x: number) => (-1 * x**3) + (2 * x**2)

  const generatePath = (cb: (x: number) => number) => {
    const arr = []
    for (let x = 0, y = 0; y >= 0; x += 0.1) {
      const step = cb(x)
      if (step >= 0) arr.push(step)
      y = step
    }
    if (arr[arr.length - 1] !== 0) arr.push(0)
    return arr
  }

  const centerCardInScreen = () => {
    const { innerWidth } = window
    const { card1rect, card2rect } = getRekt()
    setCard1X(card1rect.x)
    setCard1Y(card1rect.y)
    setCard2X(card2rect.x)
    setCard2Y(card2rect.y)
    // set the card in the middle of the screen
    card1.current.style.left = `${(innerWidth / 2) - (card1rect.width / 2)}px`
    card2.current.style.left = `${(innerWidth / 2) - (card2rect.width / 2)}px`
  }

  const handleCardAnimation = () => {
    const keyframes = animateForwards
      ? generateKeyframes()
      : [...generateKeyframes()].reverse()

    console.log('starting animation', keyframes)
    console.log('what is card', card1.current)
    const animation = card1.current.animate(keyframes, { duration: 2000 })
    // animation.play()
    console.log('animation is ', animation)
    setAnimateForwards(!animateForwards)
  }

  // bruh
  const getRekt = () => {
    return {
      card1rect: card1.current.getBoundingClientRect(),
      card2rect: card2.current.getBoundingClientRect()
    }
  }

  const style = {
    width: '400px',
    height: '400px',
    borderRadius: '8px',
    border: '1px solid black',
    background: 'linear-gradient(red, blue)'
  }

  const card1Style = {
    left: `${card1X}px`,
    top: `${card1Y}px`
  }

  const card2Style = {
    left: `${card2X}px`,
    top: `${card2Y}px`
  }

  interface WrappedProps {
    children: any;
    innerStyle?: any;
  }

  const WrappedCard = forwardRef<HTMLDivElement, WrappedProps>(({ children, innerStyle }, ref) => (
    <DragCard innerRef={ref} innerStyle={innerStyle}>
      {children}
    </DragCard>
  ))

  return (
    <div className="three-d-test">
      <WrappedCard
        ref={card1}
        innerStyle={card1Style}
      >
        <div
          style={style}
          onClick={handleCardAnimation}
        />
      </WrappedCard>
      <WrappedCard
        ref={card2}
        innerStyle={card2Style}
      >
        <div
          style={style}
          onClick={handleCardAnimation}
        />
      </WrappedCard>
    </div>
  )
}
