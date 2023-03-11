import React, { useState, useEffect } from 'react'
import { getRandomIntBetween } from '@/functions/getRandomIntBetween'
import '@/scss/components/random-placeholder.scss'

interface RandomPlaceholderProps {
  maxWidth?: number
  minWidth?: number
  maxHeight?: number
  minHeight?: number
}

export default function RandomPlaceholder (props: RandomPlaceholderProps) {

  const WIDTH_RANGE = [props?.minWidth || 200, props?.maxWidth || 500]
  const HEIGHT_RANGE = [props?.minHeight || 200, props?.maxHeight || 500]
  const [ width, setWidth ] = useState(0)
  const [ height, setHeight ] = useState(0)

  useEffect(() => {
    const newWidth = getRandomIntBetween(WIDTH_RANGE[0], WIDTH_RANGE[1])
    const newHeight = getRandomIntBetween(HEIGHT_RANGE[0], HEIGHT_RANGE[1])

    setWidth(newWidth)
    setHeight(newHeight)
  }, [])

  const styleObj = {
    width,
    height
  }

  const text = `${width} x ${height}`

  return (
    <div
      className="random-placeholder"
      style={styleObj}
    >
      <div className="random-placeholder__text">
        {text}
      </div>
    </div>
  )
}
