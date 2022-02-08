import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    sort: null
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
    },
});

export const { setSearch, setSort } = filtersSlice.actions;

export const selectSearch = (state) => state.filters.search;
export const selectSort = (state) => state.filters.sort;


export default filtersSlice.reducer;