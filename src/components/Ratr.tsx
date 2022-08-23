import React, { useEffect, useState, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addRating } from '@/store/rating/ratingSlice'
import Image from '@/components/Image'
import { IRootStore } from '@/store/types'
// import RandomPlaceholder from '@/components/RandomPlaceholder'
import './ratr.scss'

const API = 'https://dog.ceo/api/breeds/image/random'

export default function Ratr () {
  const imageRef = createRef<HTMLDivElement>()
  const history = useSelector((state: IRootStore) => state.rating.history)
  const dispatch = useDispatch()

  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    getNewImage()
  }, [])

  // use for offline dev
  // useEffect(() => {
  //   setImageSrc(`fake-src${(Math.random() + 1) * Math.random()}`)
  // }, [])

  const getNewImage = () => {
    axios.get(API).then((res) => setImageSrc(res.data.message))
  }

  const handleRating = (i: number) => {
    dispatch(addRating({
      src: imageSrc,
      id: `${Math.random()}`.split('.')[1]
    }))
    // getNewImage()
    animateImage()
    console.log('rated a ', i, ', much wow')
  }

  const animateImage = async () => {
    const keyframes = [
      { opacity: 1 },
      { opacity: 0 }
    ]

    const timing = { duration: 500 }

    const animation = imageRef.current.animate(keyframes, timing)

    const newImage = await axios.get(API)

    await animation.finished

    setImageSrc(newImage.data.message)

    imageRef.current.animate([...keyframes].reverse(), timing)
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

  // eslint-disable-next-line react/display-name
  const WrappedImage = React.forwardRef((props, ref) => (
    <Image ref={ref} src={props.src} />
  ))

  return (
    <div className="ratr-page">
      RATR!
      <div className="the-ratr">
        <Image
          ref={imageRef}
          src={imageSrc}
        />

        {/* use for offline dev */}
        {/* <RandomPlaceholder
          maxWidth={400}
          minWidth={350}
          maxHeight={400}
          minHeight={350}
        /> */}
        <div className="the-ratr__buttons">{ renderRatingButtons() }</div>
      </div>
      <div className="rating-history">
        { renderHistory() }
      </div>
    </div>
  )
}
