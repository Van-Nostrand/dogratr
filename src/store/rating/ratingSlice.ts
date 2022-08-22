import { createSlice } from '@reduxjs/toolkit'
import { IHistory } from '@/store/types'

interface IAction {
  payload: IHistory;
}

interface IRatingState {
  history: IHistory[] | [];
}

// interface IRatingSlice {
//   name: string;
//   initialState: {
//     history: IHistory[] | [];
//   },
//   reducers: {
//     addRating: (state: IRatingState, action: IAction) => void;
//   }
// }

export const ratingSlice = createSlice({
  name: 'rating',
  initialState: {
    history: []
  },
  reducers: {
    addRating: (state: IRatingState, action: IAction) => {
      state.history = [...state.history, action.payload]
    }
  }
})

export const { addRating } = ratingSlice.actions

export default ratingSlice.reducer
