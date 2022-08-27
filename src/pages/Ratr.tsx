import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RandomPlaceholder from '@/components/RandomPlaceholder'
// import CardStack from '@/components/card-stack'
// import ThreeDTransformTest from '@/components/card-stack/ThreeDTransformTest'
import { addRating } from '@/store/rating/ratingSlice'
import { cyclePuppers } from '@/store/pupper/pupperSlice'
import { IRootStore } from '@/store/types'
import './ratr.scss'

// const API = 'https://dog.ceo/api/breeds/image/random'

export default function Ratr () {
  const history = useSelector((state: IRootStore) => state.rating.history)
  const dispatch = useDispatch()

  const [imageSrc, setImageSrc] = useState<string>('')
  const [cardNumber, setCardNumber] = useState<number>(1)
  // const [imageFaded, setImageFaded] = useState<boolean>(false)

  // useEffect(() => {
  //   getNewImage()
  // }, [])

  useEffect(() => {
    // setImageSrc(`imagesrc${(Math.random() + 1) * Math.random()}`)
    offlineSetNewImage()
  }, [])

  const offlineSetNewImage = () => {
    setImageSrc(offline_randomImageSrc())
  }

  // const getNewImage = () => {
  //   axios.get(API).then((res) => setImageSrc(res.data.message))
  // }

  const offline_randomImageSrc = () => {
    return `imagesrc${(Math.random() + 1) * Math.random()}`
  }

  const handleRating = (i: number) => {
    dispatch(addRating({
      src: imageSrc,
      id: `${Math.random()}`.split('.')[1],
      value: i
    }))
    setCardNumber(cardNumber + 1)
    // getNewImage()
    dispatch(cyclePuppers())
    offlineSetNewImage()
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

  // const cardInfo = [{
  //   src: imageSrc,
  //   name: `Card No. ${cardNumber}`
  // }, {
  //   src: offline_randomImageSrc(),
  //   name: `Card No. ${cardNumber + 1}`
  // }]

  // TESTING cardstack
  // return (
  //   <div className="ratr-page">
  //     RATR!
  //     <div className="the-ratr">
  //       <CardStack cardInfo={cardInfo}>
  //         {/* <RandomPlaceholder
  //           minWidth={300}
  //           maxWidth={350}
  //           minHeight={400}
  //           maxHeight={450}
  //         /> */}
  //         <div className="the-ratr__buttons">{ renderRatingButtons() }</div>
  //       </CardStack>
  //     </div>
  //     <div className="rating-history">
  //       { renderHistory() }
  //     </div>
  //   </div>
  // )
  return (
    <div className="ratr-page">
      RATR!
      <div className="the-ratr">
        <RandomPlaceholder
          minWidth={300}
          maxWidth={350}
          minHeight={400}
          maxHeight={450}
        />
        <div className="the-ratr__buttons">{ renderRatingButtons() }</div>
      </div>
      <div className="rating-history">
        { renderHistory() }
      </div>
    </div>
  )
}
