import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import FadeInOutImage from '@/components/FadeInOutImage'
import { addRating } from '@/store/rating/ratingSlice'
import { IRootStore } from '@/store/types'
import './ratr.scss'

const API = 'https://dog.ceo/api/breeds/image/random'

export default function Ratr () {
  const history = useSelector((state: IRootStore) => state.rating.history)
  const dispatch = useDispatch()

  const [imageSrc, setImageSrc] = useState<string>('')
  const [imageFaded, setImageFaded] = useState<boolean>(false)

  useEffect(() => {
    getNewImage()
  }, [])

  const getNewImage = () => {
    axios.get(API).then((res) => setImageSrc(res.data.message))
  }

  const handleRating = (i: number) => {
    dispatch(addRating({
      src: imageSrc,
      id: `${Math.random()}`.split('.')[1],
      value: i
    }))
    getNewImage()
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
        <FadeInOutImage
          imageFaded={imageFaded}
          setImageFaded={setImageFaded}
          src={imageSrc}
        />
        <div className="the-ratr__buttons">{ renderRatingButtons() }</div>
      </div>
      <div className="rating-history">
        { renderHistory() }
      </div>
    </div>
  )
}
