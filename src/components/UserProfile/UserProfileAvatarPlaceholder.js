import React from "react";
import './UserProfileAvatarPlaceholder.scss'

function UserProfileAvatarPlaceholder(props) {
    return (
        <div className="user-profile__avatar-placeholder" >
            <p className="user-profile__avatar-initials">{props.firstName[0].toUpperCase() + props.lastName[0].toUpperCase()}</p>
        </div>
    );
}

export default UserProfileAvatarPlaceholder