import React, { useState } from 'react'
import './login.scss'

interface LoginProps {
  setToken: (s: string) => void;
}

export default function Login ({ setToken }: LoginProps) {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginMode, setLoginMode] = useState<boolean>(false)

  async function authUser (credentials: any, route: string) {
    console.log('authUser, creds', credentials, 'route', route)
    return fetch(`http://localhost:8081/api/${route}`, {
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
          return response.text()
        } else {
          throw new Error('response status was not 200')
        }
      })
      .then(d => {
        console.log('authUser: response is', d)
        return d
      })
      .catch((e) => console.error('error while authorizing user', e.message))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (username && password && (!loginMode && email || loginMode)) {
      const token = await authUser(
        { user: { username, password, ...(!loginMode && email ? { email } : {}) } },
        loginMode ? 'login' : 'create-user'
      )
      if (token) setToken(token)
    }
  }

  return (
    <div className="login-wrapper">
      <h1>{loginMode ? 'Log In' : 'Sign up'}</h1>
      <form onSubmit={handleSubmit}>
        { !loginMode && (
          <label>
            <h4>Email</h4>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </label>
        )}
        <label>
          <h4>Username</h4>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          <h4>Password</h4>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button
            className="btn-normal"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      <div>
        <button
          className="btn-normal"
          onClick={() => setLoginMode(!loginMode)}
        >
          switch to { loginMode ? 'signup' : 'login' }
        </button>
      </div>
    </div>
  )
}
