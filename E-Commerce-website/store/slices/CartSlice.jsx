import { createSlice } from "@reduxjs/toolkit";



const initialState = JSON.parse(localStorage.getItem("cartStore") ??[]);
const findItemIndex = (state, action) =>  state.findIndex((item) => item.id === action.payload.id)


export const cartSlice = createSlice({
  name: "cartStore",
  initialState,
  reducers: {
  addToCart(state, action) {
  const existingItemIndex = findItemIndex(state, action);
  if (existingItemIndex === -1) {
    state.push({ ...action.payload, quantity: 1 });
  } else {
    state[existingItemIndex].quantity += 1;
  }
},

removeFromCart(state, action) {
  const existingItemIndex = findItemIndex(state, action);
  if (existingItemIndex !== -1) {
    state.splice(existingItemIndex, 1);
  }
},

incrementQuantity(state, action) {
  const existingItemIndex = findItemIndex(state, action);
  if (existingItemIndex !== -1) {
    state[existingItemIndex].quantity += 1;
  }
},

decrementQuantity(state, action) {
  const existingItemIndex = findItemIndex(state, action);
  if (existingItemIndex !== -1) {
    state[existingItemIndex].quantity -= 1;
    if (state[existingItemIndex].quantity === 0) {
      state.splice(existingItemIndex, 1);
    }
  }
}
  
  }
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
