import React from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { cloud_name } from '@/config/config'

export default function Image ({ publicId, width, height, loadHandler }) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: cloud_name
    }
  })
  const theImage = cld.image(publicId)
  if (width && !height) {
    theImage.resize(fill().width(width))
  } else if (!width && height) {
    theImage.resize(fill().height(height))
  } else if (width && height) {
    theImage.resize(fill().width(width).height(height))
  }

  return <AdvancedImage onLoad={loadHandler} cldImg={theImage} />
}
