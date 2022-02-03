import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    activeTask: null
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        updateTask: (state, action) => {
           const taskIndex = state.tasks.findIndex(task => {return task.id === action.payload.id})
          state.tasks[taskIndex] = action.payload;
        },
        deleteTask: (state, action) => {
            state.tasks.splice(state.tasks.findIndex(task => {
                return task.id === action.payload
            }), 1);
        },
        setActiveTask: (state, action) => {
            state.activeTask = action.payload;
        }
    },
});

export const {setTasks, addTask, updateTask, deleteTask, setActiveTask} = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectActiveTask = (state) => state.tasks.activeTask;

export default tasksSlice.reducer;