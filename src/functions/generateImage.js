
import lazyLoadImage from './lazyLoadImage'

// const generateImage = (container, imageName) => {
const generateImage = (ref, imageName) => {
  // const img = document.createElement('img');
  // container.appendChild(img);

  //create an image and attach it to a container of some kind
  //probably a ref?

  lazyLoadImage(imageName, ref)

  //then, pass the image name, and the element, to a function called lazyLoadImage
}

export default generateImage
