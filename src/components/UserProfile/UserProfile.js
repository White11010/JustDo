import React, {useEffect} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../features/userSlice";
import {selectUserData} from "../../features/userSlice";
import {useDispatch} from "react-redux";
import {setUserData} from "../../features/userSlice";
import './UserProfile.scss'


function UserProfile(props) {

    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    const userData = useSelector(selectUserData);


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
        if(!isAuth) {
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
        }
    }, [])


    return (
        <div className="user-profile">
            {userData &&
                <div className="user-profile__avatar-wrapper">
                    <img
                        className="user-profile__avatar"
                        src={'http://34.125.5.252:3000/api/' + userData.avatarUrl}
                        alt="user-avatar"
                    />
                </div>
            }
            {
                userData &&
                    <p className="user-profile__name">{userData.firstName + ' ' + userData.lastName[0] + '.'}</p>
            }
        </div>
    );
}

export default UserProfile;