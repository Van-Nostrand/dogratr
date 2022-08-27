const PATH_MULTIPLIER = 20

const generateKeyframes = () => {
  const parab = generatePath(inverseParab)
  const polynom = generatePath(inversePoly)
  const numSteps = Math.max(parab.length, polynom.length)
  const keyframes = []

  for (let x = 0; x < numSteps; x++) {
    keyframes[x] = { transform: `translate(${parab[x]*PATH_MULTIPLIER}px, ${polynom[x]*PATH_MULTIPLIER}px)` }
  }

  // console.log('generated keyframes are', keyframes)
  return keyframes
}

const inverseParab = (x) => (-1 * x**2) + (2*x)
const inversePoly = (x) => (-1 * x**3) + (2 * x**2)

const generatePath = (cb) => {
  const arr = []
  for (let x = 0, y = 0; y >= 0; x += 0.1) {
    const step = cb(x)
    if (step >= 0) arr.push(step)
    y = step
  }
  if (arr[arr.length - 1] !== 0) arr.push(0)
  return arr
}

console.log('generating keyframes', generateKeyframes())
