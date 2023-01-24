export async function getPagedRatingsForUser (body: { username: string, imageID: number }) {
  try {
    const ratings = await fetch('http://localhost:8081/user-ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.status === 200) return response.json()
    })
    return ratings
  } catch (error) {
    console.error('getPagedRatingsForUser:', error)
  }
}
