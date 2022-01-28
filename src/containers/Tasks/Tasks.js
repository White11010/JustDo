import React from 'react';
import './Tasks.scss'
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";
import TasksFilters from "../../components/Tasks/TasksFilters";
import FormSelectInput from "../../components/FormInputs/FormSelectInput";

import workIcon from '../../assets/images/categories-icons/bx-color-work.svg';
import sportIcon from '../../assets/images/categories-icons/bx-color-workout.svg'
import homeIcon from '../../assets/images/categories-icons/bx-color-house.svg'
import meetingsIcon from '../../assets/images/categories-icons/bx-color-meeting.svg'
import TasksList from "../../components/Tasks/TasksList";
import TaskCreationModal from "../../components/Tasks/TaskCreationModal";


function Tasks() {
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
            {/*<GroupsList tasks={tasks}/>*/}
            {/*<TasksList/>*/}
            <TaskCreationModal open={open} handleClose={handleClose}/>
        </div>
    );
}

export default Tasks;