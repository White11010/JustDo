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
import axios from "axios";
import {useSelector} from "react-redux";
import {selectCategories} from "../../features/categoriesSlice";

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
        number: '00:05:00',
        icon: null
    },
    {
        name: 'in 15 minutes',
        number: '00:15:00',
        icon: null
    },
    {
        name: 'in 30 minutes',
        number: '00:30:00',
        icon: null
    },
    {
        name: 'in 1 hour',
        number: '01:00:00',
        icon: null
    },
    {
        name: 'in 1 day',
        number: '24:00:00',
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

function TaskCreationForm(props) {

    const {register, handleSubmit, formState} = useForm({mode: "onChange"});

    const categories = useSelector(selectCategories);

    const [taskData, setTaskData] = React.useState({
        categoryId: 'Home',
        priority: 'neutral',
        deadline: new Date(),
        remindIn: '01:00:00',
    });

    const handleTaskData = (data) => {
        setTaskData(Object.assign(taskData, data))
    }


    const notificationToNumber = () => {
        notificationOptions.forEach(elem => {
            if (elem.name === taskData.remindIn) {
                taskData.remindIn = elem.number
            }
        });
    }

    const getCategoryId = () => {
        categories.forEach(category => {
            if (category.name === taskData.categoryId) {
                taskData.categoryId = category.id
            }
        });
    }

    const sendTaskData = () => {
        const token = localStorage.getItem('authorization');

        return axios({
            method: "post",
            url: "http://34.125.5.252:3000/api/tasks",
            data: taskData,
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    }


    const onSubmit = (data) => {
        handleTaskData(data);

        notificationToNumber();
        getCategoryId();

        console.log(taskData)
        sendTaskData()
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error.response))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="task-creation__container">
            <FormInput
                ref={register({required: true})}
                name="name"
                type="text"
                label="Task Name"
                placeholder="Enter Task Name"
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginRight: '12px'}}
            />
            <DateAndTimePicker
                handleTaskData={handleTaskData}
                keyWord="deadline"
            />
            <FormInput
                ref={register({required: true})}
                name="tags"
                type="text"
                label="Add Tags"
                placeholder=""
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginRight: '12px'}}
            />
            <FormSelectInput
                options={categoriesOptions}
                label="Set Category"
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginLeft: '12px'}}
                keyWord="categoryId"
                handleTaskData={handleTaskData}
            />
            <FormSelectInput
                label="Notification"
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginRight: '12px'}}
                options={notificationOptions}
                keyWord="remindIn"
                handleTaskData={handleTaskData}
            />
            <FormSelectInput
                options={priorityOptions}
                label="Set Color Priority"
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginLeft: '12px'}}
                keyWord="priority"
                handleTaskData={handleTaskData}
            />
            <TaskTextarea
                ref={register({required: true})}
                name="description"
                label="description"
                placeholder="Enter your text"
            />
            <div className="task-creation__actions">
                <button type="submit" disabled={!formState.isValid}
                        className="button button--primary task-creation__button">Create Task
                </button>
            </div>
        </form>
    );
}

export default TaskCreationForm;