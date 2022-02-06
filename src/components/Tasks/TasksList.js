import React, {useEffect} from 'react';
import './TasksList.scss';
import TaskItem from "./TaskItem";
import {useDispatch, useSelector} from "react-redux";
import {setActiveTask} from "../../features/tasksSlice";
import {selectActiveCategory} from "../../features/categoriesSlice";
import {selectActiveTag} from "../../features/tagsSlice";


function TasksList(props) {

    const dispatch = useDispatch();

    const activeCategory = useSelector(selectActiveCategory)
    const activeTag = useSelector(selectActiveTag)

    const [tasksList, setTasksList] = React.useState(props.tasks)
    const handleTaskList = (tasks) => setTasksList(tasks)

    const setFilteredTasks = () => {
        handleTaskList(props.tasks.filter(task => {
            return (activeCategory === 'All' || task.categoryId == activeCategory)  && (activeTag === 'All' || task.tags !== null && task.tags.split(' ').includes(activeTag));
        }))
    }

    useEffect(() => {
        setFilteredTasks()
    }, [activeCategory, activeTag])


    const selectTask = (id)  => {
        const selectedTask = tasksList.find(task => {
            return task.id === id;
        })
        dispatch(setActiveTask(selectedTask))
    }

    return (
        <ul className="tasks__list">
            {
                tasksList.map(task => {
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