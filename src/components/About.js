import React, { useState, useEffect } from 'react'
import '@/scss/components/_about.scss'

export default function About () {

  const [ imagePath, setImagePath ] = useState()

  useEffect(() => {
    const context = require.context('../../assets', false, /.*(scoutberry).*(png|jpe?g)$/)
    const images = context.keys().map(context)
    setImagePath(images[0])
  }, [])

  const paragraph1 = <p className='paragraph1'>woof woof</p>

  if (imagePath) {
    return (
      <div className="about-page-container">
        {paragraph1}
        <div className="about-image-element-wrapper">
          <img src={imagePath} alt="berrypicture" />
        </div>
      </div>
    )
  }

  //import image here
  return (
    <div className="about-page-container">
      {paragraph1}
      <div className="about-image-element-wrapper">
        <span />
      </div>
    </div>
  )
}
