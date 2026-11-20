import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    city: null,
    shopsInMyCity: null,
    itemsInCity: null,
    userLocation: null,
    cartItems:  JSON.parse(localStorage.getItem("cartItems")) || []
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },

        setCity: (state, action) => {
            state.city = action.payload;
        },

        setShopsInMyCity: (state, action) => {
            state.shopsInMyCity = action.payload;
        },

        setItemsInCity: (state, action) => {
            state.itemsInCity = action.payload
        },

        setUserLocation: (state, action) => {
            state.userLocation = action.payload;
        },

        logout: (state) => {
            state.userData = null;
            state.city = null;
            state.cartItems = [];
        },

        addToCart: (state, action) => {
            const cartItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === cartItem.id);
            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
            }
            else {
                state.cartItems.push(cartItem)
            }
        },

        incrementCartItem: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload
            );
            if (item) item.quantity += 1;
        },

        decrementCartItem: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
        }

    }
});

export const {
    setUserData,
    setCity,
    setShopsInMyCity,
    setItemsInCity,
    setUserLocation,
    logout,
    addToCart,
    incrementCartItem,
    decrementCartItem,
    removeItem
} = userSlice.actions;

export default userSlice.reducer;