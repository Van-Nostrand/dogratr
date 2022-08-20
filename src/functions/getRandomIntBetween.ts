export const getRandomIntBetween = (min: number, max: number) => {
  try {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new TypeError('min and/or max is not an integer')
    } else {
      return Math.floor((Math.random() * (max - min + 1)) + min)
    }
  } catch (error) {
    console.error('error in getRandomIntBetween:', error)
  }
}
