import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/CartSlice'
 const store = configureStore({
  reducer: {
 cartStore: cartReducer
  }
})

export default store