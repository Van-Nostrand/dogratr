async function sendRating (data: any) {
  return await fetch('http://localhost:8081/rting', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error('response status not 200')
      }
    })
    .catch((err) => console.error('sendRating:', err.message))
}

async function getRatings () {
  return await fetch('http://localhost:8081/rtings', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error('response status was not 200')
      }
    })
    .catch((err) => console.error('getRatings:', err.message))
}

export { sendRating, getRatings }
