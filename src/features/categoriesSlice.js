import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: null,
    activeCategory: 'All'
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
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        }
    },
});

export const { setCategories, addCategory, updateCategory, deleteCategory, setActiveCategory } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories;
export const selectActiveCategory = (state) => state.categories.activeCategory;

export default categoriesSlice.reducer;