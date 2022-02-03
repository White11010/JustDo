import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: null
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload)
        },
        updateCategory: (state, action) => {
            const categoryIndex = state.categories.findIndex(category => {return category.id === action.payload.id})
            state.tasks[categoryIndex] = action.payload;
        },
        deleteCategory: (state, action) => {
            state.categories.splice(state.categories.findIndex(category => {
                return category.id === action.payload
            }), 1);
        },
    },
});

export const { setCategories, addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;