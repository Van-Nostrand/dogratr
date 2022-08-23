import React, { useEffect, useRef } from 'react'
import './image.scss'

export interface FadeInOutImageProps {
  src: string;
  imageFaded: boolean;
  setImageFaded: (b: boolean) => void;
  alt?: string;
}

export default function FadeInOutImage ({ src, alt, imageFaded, setImageFaded }: FadeInOutImageProps) {
  const imageRef = useRef(null)

  const timing = { duration: 500 }
  const keyframes = [
    { opacity: 1 },
    { opacity: 0 }
  ]

  useEffect(() => {
    if (src !== '') {
      fadeOutImage()
        .then(() => setImageFaded(true))
        .then(() => fadeInImage())
    }
  }, [src])

  const fadeInImage = async () => {
    const animation = imageRef.current.animate([...keyframes].reverse(), timing)
    await animation.finished
    setImageFaded(false)
  }

  const fadeOutImage = async () => {
    return new Promise((resolve) => {
      const animation = imageRef.current.animate([{ opacity: 1 }, { opacity: 0 }], timing)
      resolve(animation.finished)
    })
  }

  return (
    <div
      ref={imageRef}
      className="img"
    >
      { imageFaded }
      <img
        className="img__img"
        alt={alt}
        src={src}
      />
      <div
        className="img__placeholder"
      />
    </div>
  )
}
