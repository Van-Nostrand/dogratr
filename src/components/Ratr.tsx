import React, { useEffect, useState } from 'react'
import RandomPlaceholder from '@/components/RandomPlaceholder'
import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios'
import { addRating } from '@/store/rating/ratingSlice'
// import Image from '@/components/Image'
import { IRootStore } from '@/store/types'
import './ratr.scss'

// const API = 'https://dog.ceo/api/breeds/image/random'

export default function Ratr () {
  const history = useSelector((state: IRootStore) => state.rating.history)
  const dispatch = useDispatch()

  const [imageSrc, setImageSrc] = useState<string>('')

  // useEffect(() => {
  //   axios.get(API).then((res) => setImageSrc(res.data.message))
  // }, [])

  useEffect(() => {
    setImageSrc(`fake-src${(Math.random() + 1) * Math.random()}`)
  }, [])

  const handleRating = (i: number) => {
    dispatch(addRating({
      src: imageSrc,
      id: `${Math.random()}`.split('.')[1]
    }))
    console.log('rated a ', i, ', much wow')
  }

  const renderRatingButtons = () => {
    return new Array(10).fill(null).map((_, i) => (
      <button
        key={`btn${i}`}
        onClick={() => handleRating(i)}
      >
        { i + 1 }
      </button>
    ))
  }

  const renderHistory = () => {
    return history.map((h, i) => (
      <div key={`hist${i}`}>
        <div>{h?.src}</div>
        <div>{h?.id}</div>
      </div>
    ))
  }

  return (
    <div className="ratr-page">
      RATR!
      <div className="the-ratr">
        {/* <Image src='https://dog.ceo/api/breeds/image/random' /> */}
        <RandomPlaceholder
          maxWidth={400}
          minWidth={350}
          maxHeight={400}
          minHeight={350}
        />
        <div className="the-ratr__buttons">{ renderRatingButtons() }</div>
      </div>
      <div className="rating-history">
        { renderHistory() }
      </div>
    </div>
  )
}
