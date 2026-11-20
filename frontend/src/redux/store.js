import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';
import ownerSlice from './ownerSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        owner: ownerSlice
    }
})

store.subscribe(() => {
    localStorage.setItem("cartItems", JSON.stringify(store.getState().user.cartItems));
})
// store the cartItems to localstorage to avoid resetting of cartItems when reloading