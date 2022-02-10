import React from 'react';
import FormInput from "../FormInputs/FormInput";
import DateAndTimePicker from "../FormInputs/DateAndTimePicker";
import TaskTextarea from "../TasksInputs/TaskTextarea";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {setActiveTask, updateTask} from "../../features/tasksSlice";
import {selectActiveTask} from "../../features/tasksSlice";
import TaskCategorySelect from "../TasksInputs/TaskCategorySelect";
import TaskPrioritySelect from "../TasksInputs/TaskPrioritySelect";
import TaskNotificationSelect from "../TasksInputs/TaskNotificationSelect";
import {useMediaQuery} from "react-responsive";


function TaskEditingForm(props) {
    const dispatch = useDispatch();

    const {register, handleSubmit, formState} = useForm({mode: "onChange"});

    const activeTask = useSelector(selectActiveTask)

    const [taskData, setTaskData] = React.useState({id: activeTask.id});

    const handleTaskData = (data) => {
        console.log(data)
        setTaskData(Object.assign(taskData, data))
    }


    const sendTaskDataUpdated = () => {
        const token = localStorage.getItem('authorization');

        return axios({
            method: "put",
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
        sendTaskDataUpdated()
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    dispatch(updateTask(response.data.data))
                    props.handleCose();
                    dispatch(setActiveTask(null))
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
                value={activeTask.name}
                style={leftSideInputStyle}
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
                value={activeTask.tags}
                style={leftSideInputStyle}
            />
            <TaskCategorySelect
                style={rightSideInputStyle}
                keyWord="categoryId"
                handleTaskData={handleTaskData}
                categoryId={activeTask.categoryId}
            />
            <TaskNotificationSelect
                style={leftSideInputStyle}
                keyWord="remindIn"
                remindIn={activeTask.remindIn}
                handleTaskData={handleTaskData}
            />
            <TaskPrioritySelect
                priority={activeTask.priority}
                style={rightSideInputStyle}
                keyWord="priority"
                handleTaskData={handleTaskData}
            />
            <TaskTextarea
                ref={register({required: true})}
                name="description"
                label="description"
                placeholder="Enter your text"
                value={activeTask.description}
            />
            <div className="task-creation__actions">
                <button
                    type="submit"
                    disabled={!formState.isValid}
                    className="button button--primary task-creation__button"
                >
                    Confirm changes
                </button>
            </div>
        </form>
    );
}

export default TaskEditingForm;