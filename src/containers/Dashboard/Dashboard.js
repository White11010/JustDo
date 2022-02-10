import React, {useEffect} from 'react';
import './Dashboard.scss';
import { io } from "socket.io-client";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveTask, setActiveTask} from "../../features/tasksSlice";
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
import {selectCategories, setCategories} from "../../features/categoriesSlice";


function Dashboard(props) {

    const dispatch = useDispatch()

    const activeTask = useSelector(selectActiveTask);
    const handleCloseActiveTask = () => {
        dispatch(setActiveTask(null))
    }

    const tags = useSelector(selectTags);

    const getUserData = (token) => {
        return axios({
            method: "get",
            url: "http://34.125.5.252:3000/api/users",
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    };

    useEffect(() => {
        const token = localStorage.getItem('authorization');
        if (token) {
            getUserData(token)
                .then(response => {
                    dispatch(setUserData(response.data));
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

    const getCategoriesFromApi = (token) => {
        return axios({
            method: "get",
            url: "http://34.125.5.252:3000/api/categories",
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    }



    useEffect(() => {
        const token = localStorage.getItem('authorization');

        getCategoriesFromApi(token)
            .then(response => {
                dispatch(setCategories(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const userData = useSelector(selectUserData)

    useEffect(() => {
        if (userData !== null) {
            const socket = io("http://34.125.5.252:3000/api/websockets?id=" + userData.id)
            socket.on("connect", () => {
                console.log("Connected!")
            })
            socket.on("reminder", (data) => {
                console.log(data)
            })
            socket.on("expired", (data) => {
                console.log(data)
            })
        }
    }, [userData])



    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

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
                                createdIn={activeTask.createdIn}
                                remindAt={activeTask.remindAt}
                                tags={activeTask.tags}
                                description={activeTask.description}
                            />
                        </div>
                        <div className="dashboard__sidebar-background--right" onClick={handleCloseActiveTask}/>
                    </>
                }
            </div>
        </>
    );
}

export default Dashboard;