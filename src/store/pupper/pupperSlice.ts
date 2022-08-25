import { createSlice } from '@reduxjs/toolkit'

interface IPupImage {
  src: string;
}

export interface IPup {
  id: string;
  name: string;
  images: IPupImage[]
}

export interface IPupperState {
  pups: IPup[]
}

export const pupperSlice = createSlice({
  name: 'pupper',
  initialState: {
    pups: []
  },
  reducers: {
    createPupper: (state: IPupperState, action) => {
      state.pups = [...state.pups, action.payload]
    },
    cyclePuppers: (state: IPupperState) => {
      state.pups = state.pups.slice(1)
    }
  }
})

export const { createPupper, cyclePuppers } = pupperSlice.actions

export default pupperSlice.reducer
