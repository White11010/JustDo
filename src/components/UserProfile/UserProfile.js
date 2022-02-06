import React, {useEffect} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import {selectIsAuth, setAuth} from "../../features/userSlice";
import {selectUserData} from "../../features/userSlice";
import {useDispatch} from "react-redux";
import {setUserData} from "../../features/userSlice";
import './UserProfile.scss'
import UserProfileMenu from "./UserProfileMenu";
import {useNavigate} from "react-router";
import UserProfileModal from "./UserProfileModal";


function UserProfile(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const isAuth = useSelector(selectIsAuth);

    const userData = useSelector(selectUserData);

    const [open, setOpen] = React.useState(false);
    const handleToggleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);


    const [modalOpen, setModalOpen] = React.useState(false)
    const handleModalOpen = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false)

    useEffect(() => {
        if (modalOpen) {
            handleClose()
        }
    }, [modalOpen])

    const logOut = () => {
        localStorage.removeItem('authorization');
        navigate('/');
        dispatch(setAuth(false))
    }


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


    return (
        <>
            <div className="user-profile" onClick={handleToggleOpen}>
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
                {
                    open &&
                    <UserProfileMenu
                        name={userData.firstName + ' ' + userData.lastName[0] + '.'}
                        email={userData.email}
                        avatarUrl={'http://34.125.5.252:3000/api/' + userData.avatarUrl}
                        logOut={logOut}
                        handleModalOpen={handleModalOpen}
                    />
                }
            </div>
            <UserProfileModal
                open={modalOpen}
                handleModalClose={handleModalClose}
                logOut={logOut}
            />
        </>
    );
}

export default UserProfile;