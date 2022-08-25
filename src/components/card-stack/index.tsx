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

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      dispatch(createPupper({
        id: `${generateRandom()}`.split('.')[1],
        name: `Pupper ${i + 1}`,
        images: [{ src: `puppersrc${generateRandom()}` }]
      }))
    }
  }, [])

  const keyframes = [
    { transform: 'translateX(0px)' },
    { transform: 'translateX(25vw)' },
    { transform: 'translateX(50vw)' },
    { transform: 'translateX(75vw)' },
    { transform: 'translateX(100vw)' }
  ]

  const timing = {
    duration: 500
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
    const animation = card1Ref.current.animate(keyframes, timing)
    console.log('animation started')
    await animation.finished
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
