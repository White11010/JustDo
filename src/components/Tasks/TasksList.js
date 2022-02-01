import React from 'react';
import './TasksList.scss';
import TaskItem from "./TaskItem";

function TasksList(props) {
    return (
        <ul className="tasks__list">
            {
                props.tasks.map(task => {
                    return (
                        <TaskItem
                            key={task.id}
                            name={task.name}
                            priority={task.priority}
                            deadline={task.deadline}
                            categoryId={task.categoryId}
                            tags={task.tags}
                        />
                    )
                })
            }
        </ul>
    );
}

export default TasksList;