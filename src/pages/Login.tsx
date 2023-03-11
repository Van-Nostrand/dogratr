import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authUser } from '@/functions/authFunctions'
import { useShallowEqualSelector } from '@/hooks'
import { IRootStore } from '@/store/types'
import './login.scss'

interface LoginProps {
  setLogin: (data: any) => void
}

export default function Login ({ setLogin }: LoginProps) {
  const navigate = useNavigate()
  const { verifiedLogin, checkingToken } = useShallowEqualSelector((state: IRootStore) => ({
    verifiedLogin: state.auth.verifiedLogin,
    checkingToken: state.auth.checkingToken
  }))

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMode, setLoginMode] = useState(false)

  // if loading this page directly, navigate to ratr once user login has been validated
  useEffect(() => {
    if (verifiedLogin && !checkingToken) {
      navigate('/ratr')
    }
  }, [verifiedLogin, checkingToken])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (username && password && (!loginMode && email || loginMode)) {
      const apiEndpoint = loginMode ? 'login' : 'create-user'
      try {
        console.log('about to auth user')
        const data = await authUser(
          { user: { username, password, ...(!loginMode && email ? { email } : {}) } },
          apiEndpoint
        )

        if (!('token' in data)) {
          throw new Error(`${apiEndpoint} api response does not contain token`, { cause: data })
        }

        data.username = username
        data.email = email

        setLogin(data || null)
        navigate('/ratr')
      } catch (error) {
        console.error('Error in Login/handleSubmit:', error)
        // todo: handle error states here
      }
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
