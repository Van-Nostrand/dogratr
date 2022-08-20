export const useIntersectionObserver = (ref: HTMLElement, showImage: (arg: boolean) => void) => {
  // console.log("registerObserver has been called")
  const observer = new IntersectionObserver((elements, observer) => {
    elements.forEach((element) => {
      if (!element.isIntersecting) {
        return
      }

      showImage(true)
      observer.disconnect()
    })
  })
  observer.observe(ref)
}
