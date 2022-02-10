import React from 'react';
import './TaskCreationForm.scss';
import {useForm} from "react-hook-form";
import FormInput from "../FormInputs/FormInput";
import TaskTextarea from "../TasksInputs/TaskTextarea";
import DateAndTimePicker from "../FormInputs/DateAndTimePicker";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectCategories} from "../../features/categoriesSlice";
import {selectActiveCategory} from "../../features/categoriesSlice";
import {useDispatch} from "react-redux";
import {addTask} from "../../features/tasksSlice";
import TaskPrioritySelect from "../TasksInputs/TaskPrioritySelect";
import TaskCategorySelect from "../TasksInputs/TaskCategorySelect";
import TaskNotificationSelect from "../TasksInputs/TaskNotificationSelect";
import TasksTagsInput from "../TasksInputs/TasksTagsInput";
import moment from "moment";
import {useMediaQuery} from "react-responsive";
import arrowIcon from "../../assets/images/bx-chevron-left.svg";
import arrowIconWhite from "../../assets/images/bx-chevron-left-white.svg";
import plusIcon from '../../assets/images/bx-plus.svg'

function TaskCreationForm(props) {


    const dispatch = useDispatch();


    const {register, handleSubmit, formState} = useForm({mode: "onChange"});

    const categories = useSelector(selectCategories);

    const activeCategory = useSelector(selectActiveCategory)

    const [taskData, setTaskData] = React.useState({status: 'queued'});

    const handleTaskData = (data) => {
        setTaskData(Object.assign(taskData, data))
    }

    const [bgImage, setBgImage] = React.useState(arrowIcon);
    const handleMouseOver = () => setBgImage(arrowIconWhite)
    const handleMouseOut = () => setBgImage(arrowIcon)
    const handleClick = () => {
        setBgImage(arrowIconWhite)
        props.handleCose()
    }

    const sendTaskData = () => {
        const token = localStorage.getItem('authorization');

        console.log(taskData)

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
        const notificationToMinutes = moment(taskData.remindAt, "HH:mm:ss").diff(moment().startOf('day'), 'minutes');
        const notificationDate = moment(taskData.deadline).subtract(notificationToMinutes, 'minutes').utc().toISOString()
        handleTaskData(data);
        // handleTaskData({remindAt: notificationDate})
        handleTaskData({deadline: "2022-02-07T16:01:00.000Z"})
        handleTaskData({remindAt: "2022-02-07T15:56:00.000Z"})
        sendTaskData()
            .then((response) => {
                console.log(response)
                if (response.status === 201) {
                    dispatch(addTask(response.data.data))
                    props.handleCose();
                }
            })
            .catch(error => console.log(error.response))
    };

    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    const leftSideInputStyle =  isMobile ? {flexBasis: '100%', marginBottom: '27px'} : (isTablet ? {flexBasis: '100%', marginBottom: '37px'} : {flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginRight: '12px'})
    const rightSideInputStyle = isMobile ? {flexBasis: '100%', marginBottom: '27px'} : (isTablet ? {flexBasis: '100%', marginBottom: '37px'} : {flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginLeft: '12px'})

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="task-creation__container">
            <FormInput
                ref={register({required: true})}
                name="name"
                type="text"
                label="Task Name"
                placeholder="Enter Task Name"
                style={leftSideInputStyle}
            />
            <DateAndTimePicker
                handleTaskData={handleTaskData}
                keyWord="deadline"
            />
            <TasksTagsInput
                keyWord="tags"
                style={leftSideInputStyle}
                handleTaskData={handleTaskData}
            />
            <TaskCategorySelect
                style={rightSideInputStyle}
                keyWord="categoryId"
                handleTaskData={handleTaskData}
                categoryId={categories[0].id}
            />
            <TaskNotificationSelect
                style={leftSideInputStyle}
                keyWord="remindAt"
                remindIn="00:05:00"
                handleTaskData={handleTaskData}
            />
            <TaskPrioritySelect
                priority="Neutral"
                style={rightSideInputStyle}
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
                <button
                    className="button modal__back-button task-creation__back-button"
                    onClick={handleClick}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
                <button type="submit" 
                        disabled={!formState.isValid}
                        className="button button--primary task-creation__button"
                >
                    Create task
                    <img src={plusIcon} alt="plus"/>
                </button>
            </div>
        </form>
    );
}

export default TaskCreationForm;