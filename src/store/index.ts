import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from '@/store/counter/counterSlice'
import ratingReducer from '@/store/rating/ratingSlice'
import pupperReducer from '@/store/pupper/pupperSlice'
import authReducer from '@/store/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter']
}

const reducers = combineReducers({
  counter: counterReducer,
  rating: ratingReducer,
  pupper: pupperReducer,
  auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)
