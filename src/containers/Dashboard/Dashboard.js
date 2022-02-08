import React, {useEffect} from 'react';
import { io } from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveTask} from "../../features/tasksSlice";
import {selectTags} from "../../features/tagsSlice";
import UserProfile from "../../components/UserProfile/UserProfile";
import './Dashboard.scss';
import DashboardLogo from "../../components/Dashboard/DashboardLogo";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import TagsList from "../../components/TagsList/TagsList";
import DashboardSidebarLine from "../../components/Dashboard/DashboardSidebarLine";
import Groups from "../Groups/Groups";
import Tasks from "../Tasks/Tasks";
import ActiveTask from "../../components/ActiveTask/ActiveTask";
import {selectUserData, setUserData} from "../../features/userSlice";
import axios from "axios";


function Dashboard(props) {

    const dispatch = useDispatch()

    const activeTask = useSelector(selectActiveTask);

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





    return (
        <div className="dashboard" style={activeTask ? {gridTemplateColumns: '280px 1fr 284px'} : {gridTemplateColumns: '280px 1fr 0'}}>
            <div className="dashboard__sidebar--left">
                <DashboardLogo/>
                <CategoriesList/>
                <DashboardSidebarLine/>
                <TagsList tags={tags}/>
                <UserProfile/>
            </div>
            <div className="dashboard__tasks">
                <Groups/>
                <Tasks/>
            </div>
            {
                activeTask &&
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
            }

        </div>
    );
}

export default Dashboard;