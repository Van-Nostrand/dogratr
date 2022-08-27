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
  cardInfo?: ICard[];
}

interface IKeyframe {
  transform: string;
  zIndex: number;
}

type TKeyframes = Array<IKeyframe>

export default function CardStack ({ children }: CardStackProps) {
  const dispatch = useDispatch()
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const pups = useSelector((state: IRootStore) => state.pupper.pups)
  const generateRandom = () => (Math.random() + 1) * Math.random()

  const [topPup, setTopPup] = useState<IPup | undefined>()
  const [nextPup, setNextPup] = useState<IPup | undefined>()
  const [pupsInit, setPupsInit] = useState<boolean>(false)
  const [cardInFront, setCardInFront] = useState<boolean>(true) // true is 1, false is 2
  const [wrapKeyframes, setWrapKeyframes] = useState<TKeyframes>([])
  const [zFrames, setZFrames] = useState<TKeyframes>([])

  const X_PATH_MULTIPLIER = 900
  const Y_PATH_MULTIPLIER = 45
  const FLIP_X = 1
  const FLIP_Y = -1
  // "square coefficient"
  const SQ_CO_1 = -0.5
  const SQ_CO_2 = 1
  // const CU_CO_1 = -40
  // const CU_CO_2 = 80
  const SIN_EXPONENT = 2.2
  const SIN_DIVISOR = 1.45

  /**
   * initial setup
   * - create dummy data
   * - create frames for animations
   * - set initial state
   */
  useEffect(() => {
    // create dummy data every refresh for now
    for (let i = 0; i < 10; i++) {
      dispatch(createPupper({
        id: `${generateRandom()}`.split('.')[1],
        name: `Card ${i + 1}`,
        images: [{ src: `puppersrc${generateRandom()}` }]
      }))
    }

    // get simple arrays to convert to frames
    const p = generatePath(inverseParab)
    const zt = new Array(p.length).fill(null).map((_, i) => i * (100 / p.length))
    const sinPath = generatePath(sinSquare)

    // generate keyframes
    const numSteps = Math.min(p.length, sinPath.length)
    const kf: TKeyframes = []

    for (let x = 0; x < numSteps; x++) {
      const frameX = p[x] * X_PATH_MULTIPLIER * FLIP_X
      const frameY = sinPath[x] * Y_PATH_MULTIPLIER * FLIP_Y
      kf[x] = {
        transform: `perspective(500px) translate3D(${frameX}px, ${frameY}px, ${-zt[x]}px)`,
        zIndex: x >= numSteps / 2 ? -1 : 0
      }
    }

    // generate zframes
    const zf = [...zt].reverse().reduce((acc, cur, i) => {
      acc.push({
        transform: `perspective(500px) translate3D(0px, 0px, -${cur}px)`,
        zIndex: i >= zt.length / 2 ? 0 : -1
      })
      return acc
    }, [])

    setWrapKeyframes(kf)
    setZFrames(zf)
    console.log('set frames, keyframes?', kf, 'zframes?', zf, 'sinPath?', sinPath)
  }, [])

  const animationOptions = {
    duration: 250,
    easing: 'ease-in-out',
    fill: 'both'
  }

  const inverseParab = (x: number) => (SQ_CO_1 * x**2) + (SQ_CO_2*x)
  const sinSquare = (x: number) => (Math.sin((x**SIN_EXPONENT) / SIN_DIVISOR))
  // const inverseCubic = (x: number) => (CU_CO_1 * x**3) + (CU_CO_2 * x**2)
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
      animateCards()
      // setCardInFront(!cardInFront)
    }
  }, [pups])

  const animateCards = async () => {
    console.log('zframes?', zFrames, 'keyframes?', wrapKeyframes)

    const anim = card1Ref.current.animate(cardInFront ? wrapKeyframes : zFrames, animationOptions).commitStyles()
    const anim2 = card2Ref.current.animate(cardInFront ? zFrames : wrapKeyframes, animationOptions).commitStyles()

    Promise.all([anim.finished, anim2.finished]).then((what:any) => console.log('what is what', what))
    await anim.finished
    await anim2.finished
    setCardInFront(!cardInFront)
  }

  const renderInnerCard = (name: string) => (
    <div className="card">
      <div className="card__image" />
      <div className="card__name">
        { name }
      </div>
    </div>
  )

  type CardProps = {
    children: any;
    className: string;
  }

  const WrappedCard = forwardRef<HTMLDivElement, CardProps>(({ children, className }, ref) => (
    <DragAndRotateCard innerRef={ref} className={className}>
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
            <WrappedCard ref={card2Ref} className="card1">
              { renderInnerCard(nextPup.name) }
              { children }
            </WrappedCard>

            <WrappedCard ref={card1Ref} className="card2">
              { renderInnerCard(topPup.name) }
              { children }
            </WrappedCard>
          </>
        ) : <div>LOADING</div>
      }
    </div>
  )
}
