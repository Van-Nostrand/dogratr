import generateImage from './generateImage'
import getImageNames from './getImageNames'

export const images = (refs: Array<any>, imageNames = getImageNames()) => {

  imageNames.forEach((name: string, i: number) => {
    generateImage(refs[i], name)
  })
}
