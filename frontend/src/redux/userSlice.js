import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    city: null,
    shopsInMyCity: null
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
    logout
} = userSlice.actions;

export default userSlice.reducer;