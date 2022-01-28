import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: [
        'morning',
        'health',
        'people',
        'worktasks'
    ]
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.tags.push(action.payload);
        }
    },
});

export const { setTags } = tagsSlice.actions;

export const selectTags = (state) => state.tags.tags;

export default tagsSlice.reducer;