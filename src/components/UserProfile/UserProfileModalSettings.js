import React from 'react';
import "./UserProfileModalSettings.scss"
import accountIcon from "../../assets/images/bx-account.svg";

function UserProfileModalSettings(props) {
    return (
        <div className="user-modal__settings">
            <p className="user-modal__settings-title">Settings</p>
            <ul className="user-modal__settings-list">
                <li className="user-modal__settings-item user-modal__settings-item--active">
                    <img src={accountIcon} alt="account icon" className="user-modal__settings-item-icon"/>
                    <p className="user-modal__settings-item-title">Account</p>
                </li>
            </ul>
        </div>
    );
}

export default UserProfileModalSettings;