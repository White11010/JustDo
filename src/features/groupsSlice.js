import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groups: [
        {
            title: 'July 18, 2021',
            id: 1,
            tasksNumber: 3
        },
        {
            title: 'July 20, 2021',
            id: 2,
            tasksNumber: 2
        },
    ]
};

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups.push(action.payload);
        }
    },
});

export const { setGroups } = groupsSlice.actions;

export const selectGroups = (state) => state.groups.groups;

export default groupsSlice.reducer;