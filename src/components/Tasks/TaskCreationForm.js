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
import {addFilteredTask, addTask} from "../../features/tasksSlice";
import TaskPrioritySelect from "../TasksInputs/TaskPrioritySelect";
import TaskCategorySelect from "../TasksInputs/TaskCategorySelect";
import TaskNotificationSelect from "../TasksInputs/TaskNotificationSelect";
import TasksTagsInput from "../TasksInputs/TasksTagsInput";

function TaskCreationForm(props) {


    const dispatch = useDispatch();


    const {register, handleSubmit, formState} = useForm({mode: "onChange"});

    const categories = useSelector(selectCategories);

    const activeCategory = useSelector(selectActiveCategory)

    const [taskData, setTaskData] = React.useState({});

    const handleTaskData = (data) => {
        setTaskData(Object.assign(taskData, data))
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
        sendTaskData()
            .then((response) => {
                console.log(response)
                if (response.status === 201) {
                    dispatch(addTask(response.data.data))
                    if (response.data.data.categoryId == activeCategory || activeCategory === 'All') {
                        dispatch(addFilteredTask(response.data.data))
                    }
                    props.handleCose();
                }
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
            <TasksTagsInput
                keyWord="tags"
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginRight: '12px'}}
                handleTaskData={handleTaskData}
            />
            <TaskCategorySelect
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginLeft: '12px'}}
                keyWord="categoryId"
                handleTaskData={handleTaskData}
                categoryId={categories[0].id}
            />
            <TaskNotificationSelect
                style={{flexBasis: 'calc(50% - 12px)', marginBottom: '37px', marginRight: '12px'}}
                keyWord="remindIn"
                remindIn="00:05:00"
                handleTaskData={handleTaskData}
            />
            <TaskPrioritySelect
                priority="Neutral"
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