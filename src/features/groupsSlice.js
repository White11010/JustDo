import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groups: []
};

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload
        },
        addGroup: (state, action) => {
            state.groups.push(action.payload)
        }
    },
});

export const { setGroups, addGroup} = groupsSlice.actions;

export const selectGroups = (state) => state.groups.groups;

export default groupsSlice.reducer;