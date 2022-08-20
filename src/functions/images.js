import generateImage from "./generateImage"
import getImageNames from "./getImageNames"

export const images = (refs, imageNames) => {

  let imageNames = getImageNames()

  for(let i = 0; i < imageNames.length; i++){
    generateImage(refs[i], imageNames[i]);
  }
}
