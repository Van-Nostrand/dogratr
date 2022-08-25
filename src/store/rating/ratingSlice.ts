import { createSlice } from '@reduxjs/toolkit'
import { IHistory } from '@/store/types'

interface IAction {
  payload: IHistory;
}

interface IRatingState {
  history: IHistory[] | [];
}

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
