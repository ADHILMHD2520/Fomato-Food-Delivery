import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopData: null,
};

const ownerSlice = createSlice({
    name: "owner",
    initialState,

    reducers: {
        setShopData: (state, action) => {
            state.shopData = action.payload;
        },
        clearShopData: (state) => {
            state.shopData = null;
        }
    }
});

export const { setShopData, clearShopData, } = ownerSlice.actions;

export default ownerSlice.reducer;