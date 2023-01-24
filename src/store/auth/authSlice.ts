import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '@/store/types'

const initialState: IAuthState = {
  token: '',
  username: '',
  email: '',
  checkingToken: true,
  verifiedLogin: false
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
      state.verifiedLogin = true
    },

    logOut: (state) => {
      state.token = '',
      state.username = '',
      state.email = '',
      state.checkingToken = false,
      state.verifiedLogin = false
    }
  }
})

export const {
  setToken,
  clearToken,
  logOut,
  setLoggedIn,
  setCheckingToken
} = authSlice.actions

export default authSlice.reducer
