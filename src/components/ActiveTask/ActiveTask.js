import React, {useEffect} from 'react';
import './ActiveTask.scss'
import neutralPriorityIcon from "../../assets/images/gray-circle.svg";
import importantPriorityIcon from "../../assets/images/red-circle.svg";
import middlePriorityIcon from "../../assets/images/blue-circle.svg";
import lowPriorityIcon from "../../assets/images/yellow-circle.svg";
import dateIcon from '../../assets/images/bx-time-five.svg';
import hoursIcon from '../../assets/images/bx-hourglass-rounded.svg'
import bellGreyIcon from '../../assets/images/bxs-bell-ring--gray.svg'
import bellRedIcon from '../../assets/images/bxs-bell-ring--red.svg'
import sportIcon from "../../assets/images/categories-icons/bx-color-workout.svg";
import homeIcon from "../../assets/images/categories-icons/bx-color-house.svg";
import workIcon from "../../assets/images/categories-icons/bx-color-work.svg";
import meetingsIcon from "../../assets/images/categories-icons/bx-color-meeting.svg";
import moment from "moment";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {selectCategories} from "../../features/categoriesSlice";
import {deleteTask} from "../../features/tasksSlice";
import {setActiveTask} from "../../features/tasksSlice";
import axios from "axios";
import TaskCreationModal from "../Tasks/TaskCreationModal";

const prioritiesIconsMap = {
    neutral: neutralPriorityIcon,
    Important: importantPriorityIcon,
    Middle: middlePriorityIcon,
    Low: lowPriorityIcon
}

const categoriesIconsMap = {
    home: homeIcon,
    sport: sportIcon,
    work: workIcon,
    meetings: meetingsIcon
}


function ActiveTask(props) {

    const dispatch = useDispatch();


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        console.log(props.remindIn)
        categories.forEach((category) => {
            if (category.id === props.categoryId) {
                handleCategoryName(category.name)
                handleCategoryIcon(categoriesIconsMap[category.name.toLowerCase()])
            }
        })
    })


    const categories = useSelector(selectCategories);

    const [categoryIcon, setCategoryIcon] = React.useState(null);
    const handleCategoryIcon = (icon) => setCategoryIcon(icon)

    const [categoryName, setCategoryName] = React.useState(null)
    const handleCategoryName = (name) => setCategoryName(name)

    const deadline = moment(props.deadline).utc().format('MMM DD') + ', ' + moment(props.deadline).utc().format('HH:MM A').toLowerCase();
    const dateOfCreation = moment(props.createdIn).utc().format('MMM DD') + ', ' + moment(props.createdIn).utc().format('HH:MM A').toLowerCase();

    const notificationToMinutes = moment(props.remindIn, "HH:mm:ss").diff(moment().startOf('day'), 'minutes');

    const notificationDate = moment(props.deadline).subtract(notificationToMinutes, 'minutes').utc().format("MMM DD, HH:MM a")

    const sendDeleteTask = () => {
        const token = localStorage.getItem('authorization');

        return axios({
            method: "delete",
            url: "http://34.125.5.252:3000/api/tasks",
            headers: {'authorization': 'Bearer ' + token},
            data: {id: props.id}
        })
            .then(response => {
                if (response.status === 200) {
                    return response;
                }
            })
            .catch(error => {
                throw error;
            })
    }

    const handleDeleteTask = () => {
        sendDeleteTask()
            .then(res => {
                if (res.status === 200) {
                    dispatch(deleteTask(props.id))
                    dispatch(setActiveTask(null))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <>

            <div className="active-task">
                <div className="active-task__container">
                    <div className="active-task__header">
                        <img
                            src={prioritiesIconsMap[props.priority]}
                            alt={props.priority}
                        />
                        <h3 className="active-task__title">
                            {props.name}
                        </h3>
                    </div>
                    <p className="active-task__subtitle">Additional info:</p>
                    <div className="active-task__info">
                        <div className="active-task__info-container">
                            <p className="active-task__info-title">Creation date:</p>
                            <div className="active-task__info-data-container">
                                <img
                                    src={dateIcon}
                                    alt="clock"
                                    className="active-task__info-icon"
                                />
                                <p className="active-task__info-data">
                                    {dateOfCreation}
                                </p>
                            </div>
                        </div>
                        <div className="active-task__info-container">
                            <p className="active-task__info-title">Deadline:</p>
                            <div className="active-task__info-data-container">
                                <img
                                    src={hoursIcon}
                                    alt="clock"
                                    className="active-task__info-icon"
                                />
                                <p className="active-task__info-data">
                                    {deadline}
                                </p>
                            </div>
                        </div>
                        <div className="active-task__info-container">
                            <p className="active-task__info-title">Notification:</p>
                            <div className="active-task__notification-container">
                                <img src={props.priority === 'Important' ? bellRedIcon : bellGreyIcon} alt="bell icon"/>
                                <p className="active-task__info-data">
                                    {notificationDate}
                                </p>
                            </div>
                        </div>
                        <div className="active-task__info-container">
                            <p className="active-task__info-title">Category:</p>
                            <div className="active-task__info-data-container">
                                {categoryIcon !== null &&
                                    <img
                                        src={categoryIcon}
                                        alt={props.priority}
                                    />
                                }
                                <p className="active-task__info-data">
                                    {categoryName}
                                </p>
                            </div>
                        </div>
                        <div className="active-task__info-container">
                            <p className="active-task__info-title">Tags:</p>
                            <div className="active-task__tags-container">
                                <ul className="active-task__info-hashtag-list">
                                    {
                                        props.tags.split(' ').map(tag => {
                                            return (
                                                <li
                                                    className="active-task__info-hashtag"
                                                    key={tag}
                                                >
                                                    {'#' + tag}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="active-task__actions">
                    <button className="button button--cancel active-task__cancel-button"
                            onClick={handleDeleteTask}>Delete
                    </button>
                    <button className="button button--secondary active-task__edit-button" onClick={handleOpen}>Edit
                    </button>
                </div>
            </div>
            <TaskCreationModal
                open={open}
                handleClose={handleClose}
                isCreation={false}
                name={props.name}
                categoryName={categoryName}
                categoryId={props.categoryId}
                tags={props.tags}
                priority={props.priority}
                remindIn={props.remindIn}
                description={props.description}
            />
        </>
    );
}

export default ActiveTask;