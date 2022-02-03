import React from 'react';
import './TasksList.scss';
import TaskItem from "./TaskItem";
import {useDispatch} from "react-redux";
import {setActiveTask} from "../../features/tasksSlice";


function TasksList(props) {

    const dispatch = useDispatch();

    const selectTask = (id)  => {
        const selectedTask = props.tasks.find(task => {
            return task.id === id;
        })
        dispatch(setActiveTask(selectedTask))
    }

    return (
        <ul className="tasks__list">
            {
                props.tasks.map(task => {
                    return (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            name={task.name}
                            priority={task.priority}
                            deadline={task.deadline}
                            categoryId={task.categoryId}
                            tags={task.tags}
                            selectTask={selectTask}
                        />
                    )
                })
            }
        </ul>
    );
}

export default TasksList;