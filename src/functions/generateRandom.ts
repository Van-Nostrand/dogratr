const generateRandom = () => (Math.random() + 1) * Math.random()

const getRandomDogImageUrl = async () => {
  try {
    const allPups: any[] = []
    await Promise.all(new Array(10).fill(null).map(() => fetch('https://dog.ceo/api/breeds/image/random')))
      .then((response) => Promise.all(response.map(r => r.json())))
      .then((response) => {
        response.forEach((r) => allPups.push({
          images: [{ src: r.message }],
          name: `${Math.floor(Math.random() * 100000)}`,
          bio: 'LOREM IPSUM BIO',
          pupID: `${Math.floor(Math.random() * 10000)}`
        }))
      })
    console.log('ALLPUPS IS', allPups)
    return allPups
    // const response = await fetch('https://dog.ceo/api/breeds/image/random')
    //   .then((res) => res.json())

    // console.log('getRandomDogImageUrl response is', response)
    // if ('message' in response) return response.message
    // else throw new Error('response does not contain a message (url)', { cause: response })
  } catch (error) {
    console.error('error in getRandomDogImageUrl', error)
  }
}

const getPresetPups = () => {
  const srcArr = [
    'https://images.dog.ceo/breeds/komondor/n02105505_3603.jpg',
    'https://images.dog.ceo/breeds/mountain-swiss/n02107574_819.jpg',
    'https://images.dog.ceo/breeds/african/n02116738_2327.jpg',
    'https://images.dog.ceo/breeds/akita/512px-Akita_inu.jpg',
    'https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_1906.jpg',
    'https://images.dog.ceo/breeds/shihtzu/n02086240_4449.jpg',
    'https://images.dog.ceo/breeds/spaniel-sussex/n02102480_3771.jpg',
    'https://images.dog.ceo/breeds/kuvasz/n02104029_3570.jpg',
    'https://images.dog.ceo/breeds/bouvier/n02106382_1399.jpg',
    'https://images.dog.ceo/breeds/mountain-bernese/n02107683_3952.jpg',
  ]
  return srcArr.map((src) => ({
    images: [{ src }],
    name: `${Math.floor(Math.random() * 100000)}`,
    bio: 'LOREM IPSUM BIO',
    pupID: `${Math.floor(Math.random() * 10000)}`
  }))
}
export { generateRandom, getRandomDogImageUrl, getPresetPups }
