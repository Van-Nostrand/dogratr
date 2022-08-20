import React from 'react'
import ImageWithObserver from '@/components/ImageWithObserver'
import { ART_DATA } from '@/constants/CONSTANTS'
import '@/scss/components/image.scss'
import '@/scss/components/_imageGallery.scss'

export default function ImageGallery () {
  const OFFLINE = false

  const imageElements = ART_DATA.map((artwork, i) => (
    <ImageWithObserver
      imageData={artwork}
      width={300}
      offline={OFFLINE}
      key={`image-element-${i}`}
    />
  ))

  return (
    <div className="gallery-page-container">
      {imageElements}
    </div>
  )
}
