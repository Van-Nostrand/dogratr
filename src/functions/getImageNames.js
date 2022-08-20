const getImageNames = () => {
  const importAll = (r) => r.keys().map(r)

  const imageNames = importAll(require.context('../../assets/', false, /\.(jpe?g|png)$/))

  return imageNames
}

export default getImageNames
