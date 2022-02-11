import React, {useEffect} from 'react';
import './Dashboard.scss';
import { io } from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveTask, selectTasks, setActiveTask} from "../../features/tasksSlice";
import {selectTags} from "../../features/tagsSlice";
import {selectUserData, setUserData} from "../../features/userSlice";
import {useMediaQuery} from "react-responsive";
import UserProfile from "../../components/UserProfile/UserProfile";
import DashboardLogo from "../../components/Dashboard/DashboardLogo";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import TagsList from "../../components/TagsList/TagsList";
import DashboardSidebarLine from "../../components/Dashboard/DashboardSidebarLine";
import Groups from "../Groups/Groups";
import Tasks from "../Tasks/Tasks";
import ActiveTask from "../../components/ActiveTask/ActiveTask";
import logoIcon from '../../assets/images/logo-icon.svg'
import burgerIcon from '../../assets/images/bx-menu-alt-left.svg'
import {setCategories} from "../../features/categoriesSlice";
import {selectIsError, setError} from "../../features/errorsSlice";
import ErrorModal from "../../components/Notifications/ErrorModal";
import API from '../../api'
import NotificationModal from "../../components/Notifications/NotificationModal";


function Dashboard() {

    const isError = useSelector(selectIsError)

    const dispatch = useDispatch()

    const activeTask = useSelector(selectActiveTask);

    const tasks = useSelector(selectTasks)

    const handleCloseActiveTask = () => {
        dispatch(setActiveTask(null))
    }

    const tags = useSelector(selectTags);

    useEffect(() => {
        API.get(`/users`)
            .then(response => {
                dispatch(setUserData(response.data));
            })
            .catch(() => {
                dispatch(setError(true))
            })
        API.get(`/categories`)
            .then(response => {
                dispatch(setCategories(response.data))
            })
            .catch(() => {
                dispatch(setError(true))
            })
    }, [])

    const userData = useSelector(selectUserData)

    useEffect(() => {
        if (userData !== null) {
            const socket = io(process.env.REACT_APP_API_URL + "/websockets?id=" + userData.id)
            socket.on('connect', () => {
                console.log('coonect')
            })
            socket.on('disconnect', () => {
                console.log('disconnect')
            })
            socket.on("reminder", (data) => {
                handleNotificationId(data)
            })
            socket.on("expired", (data) => {
                console.log(data)
            })
        }
    }, [userData])

    const [notificationId, setNotificationId] = React.useState(null);
    const handleNotificationId = (id) => setNotificationId(id);
    const [notificationData, setNotificationData] = React.useState(null)
    const handleNotificationData = (data) => setNotificationData(data)

    useEffect(() => {
        if (notificationId !== null) {
            const task = tasks.find(task => {
                return task.id === notificationId
            })
            handleNotificationData(task)
        } else {
            handleNotificationData(null)
        }
    }, [notificationId])



    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})

    const [openSidebarLeft, setOpenSidebarLeft] = React.useState(!isTablet)
    const handleSidebarLeftOpen = () => setOpenSidebarLeft(true)
    const handleSidebarLeftClose = () => setOpenSidebarLeft(false)

    useEffect(() => {
        isTablet ? handleSidebarLeftClose() : handleSidebarLeftOpen()
    }, [isTablet])

    const [tasksOpen, setTasksOpen] = React.useState(true)
    const handleTasks = () => setTasksOpen(true)
    const handleGroups = () => setTasksOpen(false)

    const selectedMenuItemClassName = "dashboard__menu-item--active";
    const nonSelectedMenuItemClassName = "dashboard__menu-item";


    return (
        <>
            {
                isTablet &&
                <header className="dashboard__header">
                    <img src={burgerIcon} alt="open menu" onClick={handleSidebarLeftOpen}/>
                    <img src={logoIcon} alt="logo"/>
                </header>
            }
            <div className="dashboard" style={isTablet ? {gridTemplateColumns: '0 1fr 0'} : (activeTask ? {gridTemplateColumns: '280px 1fr 284px'} : {gridTemplateColumns: '280px 1fr 0'})}>
                {
                    openSidebarLeft &&
                    <>
                        <div className="dashboard__sidebar--left">
                            <DashboardLogo/>
                            <CategoriesList/>
                            <DashboardSidebarLine/>
                            <TagsList tags={tags}/>
                            <UserProfile/>
                        </div>
                        <div className="dashboard__sidebar-background--left" onClick={handleSidebarLeftClose}/>
                    </>
                }
                <div className="dashboard__tasks">
                    {
                        isTablet &&
                        <div className="dashboard__menu">
                            <p className={tasksOpen ? nonSelectedMenuItemClassName : selectedMenuItemClassName} onClick={handleGroups}>My groups</p>
                            <p className={tasksOpen ? selectedMenuItemClassName :  nonSelectedMenuItemClassName} onClick={handleTasks}>My tasks</p>
                        </div>
                    }
                    {
                        isTablet ?  (tasksOpen ? <Tasks/> : <Groups/>) :
                            <>
                                <Groups/>
                                <Tasks/>
                            </>
                    }
                </div>
                {
                    activeTask &&
                    <>
                        <div className="dashboard__sidebar--right">
                            <ActiveTask
                                id={activeTask.id}
                                name={activeTask.name}
                                priority={activeTask.priority}
                                categoryId={activeTask.categoryId}
                                deadline={activeTask.deadline}
                                createdAt={activeTask.createdAt}
                                remindAt={activeTask.remindAt}
                                tags={activeTask.tags}
                                description={activeTask.description}
                            />
                        </div>
                        <div className="dashboard__sidebar-background--right" onClick={handleCloseActiveTask}/>
                    </>
                }
            </div>
            <ErrorModal open={isError}/>
            {
                (notificationData !== null) &&
                <NotificationModal
                    open={true}
                    notificationData={notificationData}
                    userData={userData}
                    handleNotificationId={handleNotificationId}
                />
            }

        </>
    );
}

export default Dashboard;