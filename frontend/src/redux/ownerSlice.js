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
        }
    }
});

export const {
    setShopData,
} = ownerSlice.actions;

export default ownerSlice.reducer;