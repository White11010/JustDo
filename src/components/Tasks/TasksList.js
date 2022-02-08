import React from 'react';
import './TasksList.scss';
import TaskItem from "./TaskItem";
import {useDispatch, useSelector} from "react-redux";
import {setActiveTask} from "../../features/tasksSlice";

function TasksList(props) {

    const dispatch = useDispatch();

    const selectTask = (id) => {
        const selectedTask =  props.tasks.find(task => {
            return task.id === id;
        })
        dispatch(setActiveTask(selectedTask))
    }

    return (
        <ul className="tasks__list">
            {
                props.tasks.map((task, index) => {
                    return (
                        <TaskItem
                            id={task.id}
                            key={task.id}
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