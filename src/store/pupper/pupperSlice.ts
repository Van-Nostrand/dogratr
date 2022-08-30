import { createSlice } from '@reduxjs/toolkit'
import generateRandom from '@/functions/generateRandom'

interface IPupImage {
  src: string;
}

export interface IPup {
  id: string;
  name: string;
  bio: string;
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
    },
    // generates 10 pups with random data
    seedDB: (state: IPupperState) => {
      const newPups = new Array(10).fill(null).map((_, i) => ({
        id: `${generateRandom()}`.split('.')[1],
        name: `Card ${i + 1}`,
        images: [{ src: `puppersrc${generateRandom()}` }],
        bio: 'bio here'
      }))
      state.pups = newPups
    }
  }
})

export const { createPupper, cyclePuppers, seedDB } = pupperSlice.actions

export default pupperSlice.reducer
