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
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error('response status was not 200')
      }
    })
    .then(d => {
      console.log('authUser: response is', d)
      return d
    })
    .catch((e) => console.error('authUser: error while authorizing user', e.message))
}

async function checkUserToken () {
  let result
  await fetch('http://localhost:8081/api/check-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include'
  }).then(response => {
    if (response.status !== 200) {
      result = Error('checkUserToken: token does not match')
    } else {
      result = true
    }
  })
  console.log('checkUserToken: inside checkUserToken, result is', result)
  return result
}

export { authUser, checkUserToken }
