import { createSlice } from "@reduxjs/toolkit";
import homeIcon from '../assets/images/categories-icons/bx-color-house.svg'
import meetingsIcon from '../assets/images/categories-icons/bx-color-meeting.svg'
import workIcon from '../assets/images/categories-icons/bx-color-work.svg'
import sportIcon from '../assets/images/categories-icons/bx-color-workout.svg'

const initialState = {
    categories: [
        {
            name: 'Home',
            iconPath: homeIcon,
        },
        {
            name: 'Meetings',
            iconPath: meetingsIcon
        },
        {
            name: 'Work',
            iconPath: workIcon
        },
        {
            name: 'Sport',
            iconPath: sportIcon
        },
    ]
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories.push(action.payload);
        }
    },
});

export const { setCategories } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;