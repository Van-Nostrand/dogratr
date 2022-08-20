import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '@/functions/useIntersectionObserver'
import Image from '@/components/Image'
import RandomPlaceholder from '@/components/RandomPlaceholder'
// import '@/scss/components/image.scss'

/**
 * loads a placeholder until the image is ready to load
 * @param {source} props path/name of image file
 */
export default function ImageWithObserver ({ imageData, width, offline }) {

  const [showImage, setShowImage] = useState(false)
  const placeholderRef = useRef(null)

  useEffect(() => {
    useIntersectionObserver(placeholderRef.current, setShowImage)
  }, [])

  if (showImage) {
    return (
      <Link
        className="thumbnail"
        to={`/details/${imageData.name.toLowerCase().replace(/( )/gi, "+")}`}
      >
        <div className="thumbnail-hover-text">more info</div>
        { !offline ? (
          <Image
            width={width}
            publicId={imageData.publicId}
          />)
        : (
          <RandomPlaceholder />
        )}
      </Link>
    )
  }

  return (
    <div ref={placeholderRef} className="thumbnail-div">
      <div className="thumbnail-hover-filter"></div>
      <span
        className="thumbnail-placeholder"
        style={{

        }}
      ></span>
    </div>
  )
}
