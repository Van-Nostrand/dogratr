// handles both creating and logging in users
async function authUser (credentials: any, route: string) {
  console.log('authUser, creds', credentials, 'route', route)
  return await fetch(`http://localhost:8081/api/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error('response status was not 200')
      }
    })
    .catch((e) => console.error('authUser: error while authorizing user', e))
}

async function checkUserToken () {
  let result
  await fetch('http://localhost:8081/api/check-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include'
  })
    .then(response => {
      if (response.status !== 200) {
        result = Error('checkUserToken: token does not match')
      } else {
        result = true
      }
    })
  console.log('checkUserToken: inside checkUserToken, result is', result)
  return result
}

// not sure about this
async function fetchRatingsForUser ({ username }: { username: string }) {
  try {
    const ratings = await fetch('http://localhost:8081/user-ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ username })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error('status was not 200')
      })

    return ratings
  } catch (error) {
    console.error('something went wrong in fetchRatingsForUser:', error)
  }
}

// function deleteCookie (key: string) {
//   console.log('deleteCookie for key', key)
//   document.cookie = `${key}=;path=/;expires=${new Date(0).toUTCString()};`
// }

// async function createPupper ()

export { authUser, checkUserToken, fetchRatingsForUser }
