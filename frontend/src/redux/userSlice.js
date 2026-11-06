import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    city: null,
    shopsInMyCity: null,
    itemsInCity:null
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

        setItemsInCity:(state,action)=>{
            state.itemsInCity=action.payload
        },

        logout: (state) => {
            state.userData = null;
            state.city = null;
        }
    }
});

export const {
    setUserData,
    setCity,
    setShopsInMyCity,
    setItemsInCity,
    logout
} = userSlice.actions;

export default userSlice.reducer;