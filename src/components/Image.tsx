import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './image.scss'

interface ImageProps {
  src: string;
  alt?: string;
}

export default function Image ({ src, alt }: ImageProps) {

  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    axios.get(src).then((res) => {
      console.log('result is ', res.data.message)
      setImageSrc(res.data.message)
    })
  }, [])

  return (
    <div
      className="img"
    >
      <img
        className="img__img"
        alt={alt}
        src={imageSrc}
      />
      <div
        className="img__placeholder"
      />
    </div>
  )
}
