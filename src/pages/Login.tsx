import React, { useState } from 'react'
import { authUser } from '@/functions/authFunctions'
// import { useAuth } from '@/hooks'
import './login.scss'

interface LoginProps {
  setLogin: (data: any) => void
}

export default function Login ({ setLogin }: LoginProps) {

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginMode, setLoginMode] = useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (username && password && (!loginMode && email || loginMode)) {
      const data = await authUser(
        { user: { username, password, ...(!loginMode && email ? { email } : {}) } },
        loginMode ? 'login' : 'create-user'
      )

      setLogin(data || null)
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
