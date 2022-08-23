import React, { RefObject } from 'react'
// import axios from 'axios'
import './image.scss'

interface ImageProps {
  src: string;
  alt?: string;
  ref: RefObject<HTMLDivElement>;
}

export default function Image ({ src, alt, ref }: ImageProps) {

  // const [imageSrc, setImageSrc] = useState<string>('')

  // useEffect(() => {
  //   axios.get(src).then((res) => {
  //     console.log('result is ', res.data.message)
  //     setImageSrc(res.data.message)
  //   })
  // }, [])

  return (
    <div
      ref={ref}
      className="img"
    >
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
