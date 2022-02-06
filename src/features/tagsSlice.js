import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: [],
    activeTag: 'All'
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setActiveTag: (state, action) => {
            state.activeTag = action.payload
        }
    },
});

export const { setTags, setActiveTag } = tagsSlice.actions;

export const selectTags = (state) => state.tags.tags;
export const selectActiveTag = (state) => state.tags.activeTag;

export default tagsSlice.reducer;