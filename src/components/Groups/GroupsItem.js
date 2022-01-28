import React from 'react';
import './GroupsItem.scss';
import folderIcon from "../../assets/images/bxs-folder.svg";
import pencilIcon from "../../assets/images/bxs-pencil.svg";
import arrowIcon from '../../assets/images/bx-chevron-down-big.svg';

function GroupsItem(props) {
    return (
        <li className="groups__item">
            <img src={folderIcon} alt="folder" className="groups__folder-icon"/>
            <div className="groups__line"/>
            <p className="groups__item-title">{props.title}</p>
            <div className="groups__actions">
                <img src={pencilIcon} alt="edit group" className="groups__edit-button"/>
                <p className="groups__show-tasks-button">Show {props.tasksNumber} tasks</p>
                <img src={arrowIcon} alt="show group" className="groups__show-tasks-arrow"/>
            </div>
        </li>
    );
}

export default GroupsItem;