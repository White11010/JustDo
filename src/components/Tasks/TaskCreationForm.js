import React from 'react';
import {Controller, useForm} from "react-hook-form";
import FormInput from "../FormInputs/FormInput";
import FormSelectInput from "../FormInputs/FormSelectInput";
import sportIcon from "../../assets/images/categories-icons/bx-color-workout.svg";
import homeIcon from "../../assets/images/categories-icons/bx-color-house.svg";
import workIcon from "../../assets/images/categories-icons/bx-color-work.svg";
import meetingsIcon from "../../assets/images/categories-icons/bx-color-meeting.svg";
import neutralPriorityIcon from "../../assets/images/gray-circle.svg";
import importantPriorityIcon from "../../assets/images/red-circle.svg";
import middlePriorityIcon from "../../assets/images/blue-circle.svg";
import lowPriorityIcon from "../../assets/images/yellow-circle.svg";
import './TaskCreationForm.scss';
import TaskTextarea from "./TaskTextarea";
import DateAndTimePicker from "../FormInputs/DateAndTimePicker";

function TaskCreationForm(props) {

    const categoriesOptions = [
        {
            name: 'Sport',
            icon: sportIcon,
        },
        {
            name: 'Home',
            icon: homeIcon,
        },
        {
            name: 'Work',
            icon: workIcon,
        },
        {
            name: 'Meetings',
            icon: meetingsIcon,
        },
    ];
    const notificationOptions = [
        {
            name: 'in 5 minutes',
            icon: null
        },
        {
            name: 'in 15 minutes',
            icon: null
        },
        {
            name: 'in 30 minutes',
            icon: null
        },
        {
            name: 'in 1 hour',
            icon: null
        },
        {
            name: 'in 1 day',
            icon: null
        },
    ];
    const priorityOptions = [
        {
            name: 'Neutral',
            icon: neutralPriorityIcon
        },
        {
            name: 'Important',
            icon: importantPriorityIcon
        },
        {
            name: 'Middle',
            icon: middlePriorityIcon
        },
        {
            name: 'Low',
            icon: lowPriorityIcon
        },

    ]


    const { register, handleSubmit, watch, errors, formState } = useForm({ mode: "onChange" });

    const [taskData, setTaskData] = React.useState({
        category: 'sport',
        priority: 'neutral'
    });

    const handleTaskData = (data) => {
        setTaskData(Object.assign(taskData, data))
    }

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="task-creation__container">
            <FormInput
                ref={register({ required: true })}
                name="name"
                type="text"
                label="Task Name"
                placeholder="Enter Task Name"
                style={{flexBasis: 'calc(50% - 12px)',marginBottom: '37px', marginRight: '12px'}}
            />
            <DateAndTimePicker />
            <FormInput
                ref={register({ required: true })}
                name="deadline"
                type="text"
                label="Add Tags"
                placeholder=""
                style={{flexBasis: 'calc(50% - 12px)',marginBottom: '37px', marginRight: '12px'}}
            />
            <FormSelectInput
                options={categoriesOptions}
                label="Set Category"
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginLeft: '12px'}}
                key="category"

            />
            <FormSelectInput
                label="Notification"
                style={{flexBasis: 'calc(50% - 12px)',marginBottom: '37px', marginRight: '12px'}}
                options={notificationOptions}
            />
            <FormSelectInput
                options={priorityOptions}
                label="Set Color Priority"
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginLeft: '12px'}}
                key="priority"

            />
            <TaskTextarea/>
            <div className="task-creation__actions">
                <button type="submit" disabled={!formState.isValid} className="button button--primary task-creation__button">Create Task</button>
            </div>
        </form>
    );
}

export default TaskCreationForm;