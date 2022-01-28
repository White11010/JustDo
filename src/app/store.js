import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import categoriesReducer from '../features/categoriesSlice';
import tagsReducer from '../features/tagsSlice'
import groupsReducer from '../features/groupsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        tags: tagsReducer,
        groups: groupsReducer
    },
});