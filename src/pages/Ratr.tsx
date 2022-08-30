import React, {
  useEffect,
  useState
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CardStack from '@/components/card-stack'
import { addRating } from '@/store/rating/ratingSlice'
import { cyclePuppers } from '@/store/pupper/pupperSlice'
import { IRootStore } from '@/store/types'
import './ratr.scss'

// const API = 'https://dog.ceo/api/breeds/image/random'

export default function Ratr () {
  const history = useSelector((state: IRootStore) => state.rating.history)
  const dispatch = useDispatch()
  // const animationRef = useRef(null)

  const [animationToggle, setAnimationToggle] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [cardNumber, setCardNumber] = useState<number>(1)
  // const [cardStackCB, setCardStackCB] = useState<any>()

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
    dispatch(cyclePuppers())
    offlineSetNewImage()
    setAnimationToggle(!animationToggle)
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
  // interface WrappedStackProps {
  //   children: any;
  //   animationRef: any;
  // }

  // const WrappedStack = forwardRef<HTMLDivElement, WrappedStackProps>(({ children }, ref) => {
  //   return (
  //     <CardStack>
  //       { children }
  //     </CardStack>
  //   )
  // })

  return (
    <div className="ratr-page">
      RATR!
      <div className="the-ratr">
        {/* <WrappedStack animationRef={animationRef}> */}
        <CardStack animationToggle={animationToggle}>
          <div className="the-ratr__buttons">{ renderRatingButtons() }</div>
        </CardStack>
        {/* </WrappedStack> */}
      </div>
      <div className="rating-history">
        { renderHistory() }
      </div>
    </div>
  )
}
