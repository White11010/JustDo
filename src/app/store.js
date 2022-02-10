import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import categoriesReducer from '../features/categoriesSlice';
import tagsReducer from '../features/tagsSlice'
import groupsReducer from '../features/groupsSlice'
import tasksReducer from '../features/tasksSlice'
import filtersReducer from '../features/filtersSlice'
import errorsReducer from '../features/errorsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        tags: tagsReducer,
        groups: groupsReducer,
        tasks: tasksReducer,
        filters: filtersReducer,
        errors: errorsReducer
    },
});