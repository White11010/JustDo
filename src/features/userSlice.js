import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    userData: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setAuth, setUserData } = userSlice.actions;

export const selectIsAuth = (state) => state.user.isAuth;
export const selectUserData = (state) => state.user.userData;

export default userSlice.reducer;