const lazyLoadImage = (imageName, ref) => {
  
  import(
    /* webpackMode: "lazy-once" */
    `../../assets/${imageName}`
  )
  //then attach the image to a ref'ed element
  .then(src => ref.current.src = src.default)
  .catch(err => console.error(err));
};

export default lazyLoadImage;