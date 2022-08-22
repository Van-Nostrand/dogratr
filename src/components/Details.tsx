import React, {
  useRef,
  useEffect,
  useState
} from 'react'
import { useParams } from 'react-router-dom'
import Image from '@/components/Image'
import { ART_DATA } from '@/constants/CONSTANTS'
import useWindowSize from '@/functions/useWindowSize'
import GoBackArrow from '@/components/GoBackArrow'
import '@/scss/components/detailScreen.scss'

export default function Details () {
  const EmailLogo = require('@/assets/emailLogo.svg')
  const imageRef = useRef(null)
  const placeholderRef = useRef(null)
  const windowSize = useWindowSize()
  const [loaded, setLoaded] = useState<boolean>(false)
  const { name } = useParams()

  useEffect(() => {
    placeholderRef.current.style.paddingBottom = `${theImage.paddingBottom}`
  }, [])

  useEffect(() => {
    if (loaded) {
      // placeholderRef.current.style.paddingBottom = ''
    }
  }, [loaded])

  const isMobile = windowSize.width < 600
  const theImage = ART_DATA.find(art => art.name.toLowerCase().replace(/( )/gi, '+') === name)
  const imageHeight = Math.floor(Math.max(window.innerHeight * 0.85, 520))
  const emailString = `mailto:example@email.com?subject=Inquiry: ${theImage.name}`

  const handleLoading = () => {
    setLoaded(true)
  }

  const renderBackArrow = () => isMobile ? <GoBackArrow to="/works" /> : <></>

  const renderImageDiv = () => (
    <div
      className="lazy-image"
      ref={imageRef}
    >
      <a
        className="lazy-image__anchor"
        href={theImage.url}
      >
        <Image
          height={imageHeight}
          publicId={theImage.publicId}
          loadHandler={handleLoading}
        />
        <div
          className={`lazy-image__placeholder ${theImage.class}`}
          ref={placeholderRef}
        />
      </a>
    </div>
  )

  return (
    <div className="detail-page-container">
      { renderBackArrow() }

      <div className="col-1">
        { renderImageDiv() }
        <div className="full-res">click image for full resolution</div>
      </div>

      {/* { isMobile ? renderImageDiv() : (
        <>
          <div>
            { renderImageDiv() }
            <div className="full-res">click image for full resolution</div>
          </div>
        </>
      )} */}
      <div className="info">
        <div className="info__title">{theImage.name}</div>
        <div className="info__medium">{theImage.medium}</div>

        <div className="info__size">{theImage.size}</div>
        <a
          className="info__email"
          href={emailString}
        >
          <div>
            <img src={EmailLogo} />
          </div>
          <span>pricing and prints</span>
        </a>
      </div>
    </div>
  )
}
