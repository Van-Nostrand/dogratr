import React, { useState } from 'react'
import './login.scss'

interface LoginProps {
  setToken: (s: string) => void;
}

async function loginUser (credentials: any) {
  return fetch('http://localhost:8081/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login ({ setToken }: LoginProps) {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const token = await loginUser({
      username,
      password
    })
    setToken(token)
  }
  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
