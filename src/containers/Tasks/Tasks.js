import React, {useEffect} from 'react';
import './Tasks.scss'
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";
import TasksFilters from "../../components/Tasks/TasksFilters";
import TaskCreationModal from "../../components/Tasks/TaskCreationModal";
import TasksList from "../../components/Tasks/TasksList";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setTasks} from "../../features/tasksSlice";
import {useSelector} from "react-redux";
import {selectTasks} from "../../features/tasksSlice";


function Tasks() {

    const dispatch = useDispatch();

    const tasks = useSelector(selectTasks);

    useEffect(() => {
        const token = localStorage.getItem('authorization');
        getTasksFromApi(token)
            .then(response => {
                console.log(response)
                dispatch(setTasks(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const getTasksFromApi = (token) => {
        return axios({
            method: "get",
            url: "http://34.125.5.252:3000/api/tasks",
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
        }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="tasks">
            <div className="tasks__header">
                <h3 className="tasks__title">My tasks</h3>
                <img src={arrowIcon} alt="arrow" className="tasks__arrow-icon"/>
                <TasksFilters/>
                <button className="button button--primary tasks__add-button" onClick={handleOpen}>Create task</button>
            </div>
            <TasksList tasks={tasks}/>
            <TaskCreationModal open={open} handleClose={handleClose}/>
        </div>
    );
}

export default Tasks;