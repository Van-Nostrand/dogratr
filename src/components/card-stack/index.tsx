import React, { useEffect, useState, useRef, forwardRef } from 'react'
// import { useSelector } from 'react-redux'
import { IPup } from '@/store/pupper/pupperSlice'
import DragAndRotateCard from './DragAndRotateCard'
import { IRootStore } from '@/store/types'
import { useShallowEqualSelector } from '@/hooks'
import './card-stack.scss'

interface CardStackProps {
  children?: any;
  animationToggle: boolean;
}

interface IKeyframe {
  transform: string;
  zIndex: number;
}

type TKeyframes = Array<IKeyframe>

// eslint-disable-next-line
export default function CardStack ({ children, animationToggle }: CardStackProps) {
  // const dispatch = useDispatch()
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const pups = useShallowEqualSelector((state: IRootStore) => state.pupper.pups)

  const [topPup, setTopPup] = useState<IPup | undefined>()
  const [nextPup, setNextPup] = useState<IPup | undefined>()
  const [pupsInit, setPupsInit] = useState<boolean>(false)
  const [cardInFront, setCardInFront] = useState<boolean>(true) // true means card 1 is first
  const [wrapKeyframes, setWrapKeyframes] = useState<TKeyframes>([])
  const [zFrames, setZFrames] = useState<TKeyframes>([])

  const X_PATH_MULTIPLIER = 900
  const Y_PATH_MULTIPLIER = 45
  const FLIP_X = 1
  const FLIP_Y = -1
  const SQ_CO_1 = -0.5 // "square coefficient"
  const SQ_CO_2 = 1
  // const CU_CO_1 = -40
  // const CU_CO_2 = 80
  const SIN_EXPONENT = 2.2
  const SIN_DIVISOR = 1.45

  // initial setup
  useEffect(() => {
    // get simple arrays to convert to frames
    const p = generatePath(inverseParab)
    const zt = new Array(p.length).fill(null).map((_, i) => i * (100 / p.length))
    const sinPath = generatePath(sinSquare)

    // generate "wrap around" animation keyframes
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

    // generate keyframes that only animate z
    const zf = [...zt].reverse().reduce((acc, cur, i) => {
      acc.push({
        transform: `perspective(500px) translate3D(0px, 0px, -${cur}px)`,
        zIndex: i >= zt.length / 2 ? 0 : -1
      })
      return acc
    }, [])
    setWrapKeyframes(kf)
    setZFrames(zf)
  }, [])

  useEffect(() => {
    if (pupsInit) animateCards()
  }, [animationToggle])

  const animationOptions = {
    duration: 250,
    easing: 'ease-in-out',
    fill: 'forwards'
  }

  const inverseParab = (x: number) => (SQ_CO_1 * x**2) + (SQ_CO_2*x)
  const sinSquare = (x: number) => Math.sin((x**SIN_EXPONENT) / SIN_DIVISOR)
  // may come in handy later
  // const cubic = (x: number) => (CU_CO_1 * x**3) + (CU_CO_2 * x**2)
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
  }, [pups])

  // loads new data into the hidden card
  const nextPupOnDeck = () => {
    if (!cardInFront) {
      setNextPup(pups[1])
    } else {
      setTopPup(pups[1])
    }
  }

  const animateCards = async () => {
    const anim = card1Ref.current.animate(cardInFront ? wrapKeyframes : zFrames, animationOptions)
    const anim2 = card2Ref.current.animate(cardInFront ? zFrames : wrapKeyframes, animationOptions)
    // wait for animations to finish before setting state
    await Promise.all([anim.finished, anim2.finished])
      .then(() => {
        setCardInFront(!cardInFront)
      })
      .then(() => {
        nextPupOnDeck()
      })
  }

  const renderInnerCard = (name: string, src:string) => (
    <div className="card">
      <div className="card__image">
        <img src={src} />
      </div>
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

  // the animation hides one card behind the other
  // so they need to be reordered in the dom or it doesn't look right
  const renderWrappedCards = () => {
    const arr = [(
      <WrappedCard key="wrapped-2" ref={card2Ref} className="card1">
        { renderInnerCard(nextPup.name, nextPup.images[0].src) }
        { children }
      </WrappedCard>
    ), (
      <WrappedCard key="wrapped-1" ref={card1Ref} className="card2">
        { renderInnerCard(topPup.name, topPup.images[0].src) }
        { children }
      </WrappedCard>
    )]
    return cardInFront ? arr : arr.reverse()
  }

  return (
    <div className="card-stack">
      <div>CARD STACK</div>

      { thereArePups
        ? renderWrappedCards()
        : <div>LOADING</div>
      }
    </div>
  )
}
