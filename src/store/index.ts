import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/store/counter/counterSlice'
import ratingReducer from '@/store/rating/ratingSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    rating: ratingReducer
  }
})
