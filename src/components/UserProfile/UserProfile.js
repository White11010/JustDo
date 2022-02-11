import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {setAuth} from "../../features/userSlice";
import {selectUserData} from "../../features/userSlice";
import {useDispatch} from "react-redux";
import {setUserData} from "../../features/userSlice";
import './UserProfile.scss'
import UserProfileMenu from "./UserProfileMenu";
import {useNavigate} from "react-router";
import UserProfileModal from "./UserProfileModal";
import API from '../../api'
import {setError} from "../../features/errorsSlice";
import UserProfileAvatarPlaceholder from "./UserProfileAvatarPlaceholder";



function UserProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    useEffect(() => {
        API.get(`/users`)
            .then(response => {
                dispatch(setUserData(response.data));
            })
            .catch(() => {
                dispatch(setError(true))
            })

    }, [])


    return (
        <>
            <div className="user-profile" onClick={handleToggleOpen}>
                {userData &&
                    <div className="user-profile__avatar-wrapper">
                        {
                            userData.avatarUrl === null ?
                                <UserProfileAvatarPlaceholder
                                    firstName={userData.firstName}
                                    lastName={userData.lastName}
                                /> :
                                <img
                                    className="user-profile__avatar"
                                    src={process.env.REACT_APP_API_URL + '/' + userData.avatarUrl}
                                    alt="user-avatar"
                                />
                        }
                    </div>
                }
                {
                    userData &&
                    <p className="user-profile__name">{userData.firstName + ' ' + userData.lastName[0] + '.'}</p>
                }
                {
                    open &&
                    <UserProfileMenu
                        firstName={userData.firstName}
                        lastName={userData.lastName}
                        name={userData.firstName + ' ' + userData.lastName[0] + '.'}
                        email={userData.email}
                        avatarUrl={userData.avatarUrl}
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