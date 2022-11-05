import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '@/store/types'

const initialState: IAuthState = {
  token: '',
  username: '',
  email: '',
  isLoggedIn: false,
  checkingToken: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    clearToken: (state) => {
      state.token = ''
    },
    setCheckingToken: (state, action) => {
      state.checkingToken = action.payload
    },
    setLoggedIn: (state, action) => {
      state.token = action.payload.token
      state.username = action.payload.username
      state.email = action.payload.email
      state.isLoggedIn = true
    }
  }
})

export const { setToken, clearToken, setLoggedIn, setCheckingToken } = authSlice.actions

export default authSlice.reducer
