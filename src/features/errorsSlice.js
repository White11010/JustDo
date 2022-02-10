import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isError: false,
    errorData: {
        title: 'Looks like we have a problem!',
        text: 'But don’t worry, you don\'t need to call a doctor, we are already looking for a solution'
    }
};

const errorsSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.isError = action.payload;
        },
        setErrorData: (state, action) => {
          state.errorData = action.payload;
        }
    },
});

export const { setError, setErrorData } = errorsSlice.actions;

export const selectIsError = (state) => state.errors.isError;
export const selectErrorData = (state) => state.errors.errorData;

export default errorsSlice.reducer;