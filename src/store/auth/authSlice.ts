import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: undefined
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    clearToken: (state) => {
      state.token = undefined
    }
  }
})
