import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/store/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
