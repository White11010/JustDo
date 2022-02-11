import React from 'react';
import "./UserProfileMenu.scss"
import settingsIcon from "../../assets/images/bx-settings.svg"
import bellIcon from "../../assets/images/bx-bell.svg"
import logoutIcon from "../../assets/images/bx-log-out.svg"
import UserProfileAvatarPlaceholder from "./UserProfileAvatarPlaceholder";


function UserProfileMenu(props) {
    return (
        <div className="user-menu">
            <div className="user-menu__data-container">
                <div className="user-menu__avatar-container">
                    {
                        props.avatarUrl === null ?
                            <UserProfileAvatarPlaceholder
                                firstName={props.firstName}
                                lastName={props.lastName}
                            /> :
                            <img src={process.env.REACT_APP_API_URL + '/' + props.avatarUrl} alt="user avatar" className="user-menu__avatar"/>
                    }
                </div>
                <div className="user-menu__data">
                    <p className="user-menu__name">{props.name}</p>
                    <p className="user-menu__email">{props.email}</p>
                </div>
            </div>
            <div className="user-menu__line"/>
            <div className="user-menu__actions">
                <div className="user-menu__action-container" onClick={props.handleModalOpen}>
                    <img src={settingsIcon} alt="Settings" className="user-menu__icon"/>
                    <p className="user-menu__action">Settings</p>
                </div>
                <div className="user-menu__action-container">
                    <img src={bellIcon} alt="Notifications" className="user-menu__icon"/>
                    <p className="user-menu__action">Notifications</p>
                </div>
                <div className="user-menu__action-container" onClick={props.logOut}>
                    <img src={logoutIcon} alt="Log" className="user-menu__icon"/>
                    <p className="user-menu__action">Log out</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfileMenu;