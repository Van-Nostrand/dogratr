import React, { useEffect, useState, useRef, forwardRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPupper, IPup } from '@/store/pupper/pupperSlice'
// import ClickAndShuffleCard from './ClickAndShuffleCard'
import DragAndRotateCard from './DragAndRotateCard'
import { IRootStore } from '@/store/types'
import './card-stack.scss'

interface ICard {
  name: string;
  src: string;
}

interface CardStackProps {
  children?: any;
  cardInfo: ICard[];
}

export default function CardStack ({ children, cardInfo }: CardStackProps) {
  const dispatch = useDispatch()
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const pups = useSelector((state: IRootStore) => state.pupper.pups)
  const generateRandom = () => (Math.random() + 1) * Math.random()

  const [topPup, setTopPup] = useState<IPup | undefined>()
  const [nextPup, setNextPup] = useState<IPup | undefined>()
  const [pupsInit, setPupsInit] = useState<boolean>(false)
  const [parab, setParab] = useState<Array<number>>([])
  const [cubic, setCubic] = useState<Array<number>>([])
  const [additiveSin, setAdditiveSin] = useState<Array<number>>([])
  const [zTransforms, setZTransforms] = useState<Array<number>>([])

  const X_PATH_MULTIPLIER = 105
  const Y_PATH_MULTIPLIER = 45
  const FLIP_X = 1
  const FLIP_Y = -1
  const CU_CO_1 = -40 // cubic coefficient
  const CU_CO_2 = 80
  const SQ_CO_1 = -0.5
  const SQ_CO_2 = 1
  const SIN_EXPONENT = 2.2
  const SIN_DIVISOR = 1.45
  // const MAGIC_NUMBER = 2.546479 // sin(x^3/this number)

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      dispatch(createPupper({
        id: `${generateRandom()}`.split('.')[1],
        name: `Card ${i + 1}`,
        images: [{ src: `puppersrc${generateRandom()}` }]
      }))
    }
    const p = generatePath(inverseParab)
    const c = generatePath(inverseCubic)
    setParab(p)
    setCubic(c)
    setZTransforms(new Array(p.length).fill(null).map((_, i) => i * (100 / p.length)))
    setAdditiveSin(generatePath(sinSquare))
  }, [])

  const timing = {
    duration: 250
  }

  const generateKeyframes = () => {
    const numSteps = Math.min(parab.length, cubic.length)
    const keyframes = []

    for (let x = 0; x < numSteps; x++) {
      const frameX = parab[x] * X_PATH_MULTIPLIER * FLIP_X
      const frameY = additiveSin[x] * Y_PATH_MULTIPLIER * FLIP_Y

      keyframes[x] = {
        transform: `translate3D(${frameX}px, ${frameY}px, ${-zTransforms[x]}px) perspective(500px)`
      }
    }

    return keyframes
  }

  const inverseParab = (x: number) => (SQ_CO_1 * x**2) + (SQ_CO_2*x)
  const inverseCubic = (x: number) => (CU_CO_1 * x**3) + (CU_CO_2 * x**2)
  const sinSquare = (x: number) => (Math.sin((x**SIN_EXPONENT) / SIN_DIVISOR))
  // const sinCubic = (x: number) => Math.sin(((3 * x**3) + x**2 + (2 * x)) / 10.2)

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

  useEffect(() => {
    console.log('THE PUPS HAVE CHANGED', pups)
    // not ready yet
    if (pups.length === 0) return

    // on init
    if (pups.length > 0 && !pupsInit) {
      setTopPup(pups[0])
      setNextPup(pups[1])
      setPupsInit(true)
    }

    // probably card rating
    // do some animation here
    if (pupsInit) {
      animateCardAway()
    }
  }, [pups])

  useEffect(() => {
    console.log('CARD INFO CHANGEd', cardInfo)
  }, [cardInfo])

  const animateCardAway = async () => {
    const zFrames = zTransforms.reduce((acc, cur) => {
      acc.push({ transform: `translateZ(${cur}px) perspective(500px)` })
      return acc
    }, [])
    const keyframes = generateKeyframes()
    const animation = card1Ref.current.animate(keyframes, timing)
    const animation2 = card2Ref.current.animate(zFrames, timing)
    console.log('animation started')
    await animation.finished
    await animation2.finished
    console.log('animation finished')
  }

  const renderInnerCard = (name: string) => {
    return (
      <div className="card">
        <div className="card__image" />
        <div className="card__name">
          { name }
        </div>
      </div>
    )
  }

  const WrappedCard = forwardRef<HTMLDivElement, { children: any }>(({ children }, ref) => (
    <DragAndRotateCard innerRef={ref} >
      { children }
    </DragAndRotateCard>
  ))

  const thereArePups = pups.length > 0 && topPup && nextPup

  return (
    <div className="card-stack">
      <div>CARD STACK</div>

      { thereArePups
        ? (
          <>
            <WrappedCard ref={card2Ref}>
              { renderInnerCard(nextPup.name) }
              { children }
            </WrappedCard>

            <WrappedCard ref={card1Ref}>
              { renderInnerCard(topPup.name) }
              { children }
            </WrappedCard>
          </>
        ) : <div>LOADING</div>
      }
    </div>
  )
}
