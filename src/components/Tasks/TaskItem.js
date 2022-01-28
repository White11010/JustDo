import React from 'react';
import folderIcon from "../../assets/images/bxs-folder.svg";
import pencilIcon from "../../assets/images/bxs-pencil.svg";
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";

function TaskItem(props) {
    return (
        <li className="tasks__item">
            <img src={folderIcon} alt="folder" className="tasks__folder-icon"/>
            <div className="tasks__line"/>
            <p className="tasks__item-title">{props.title}</p>
            <div className="tasks__actions">
                <img src={pencilIcon} alt="edit group" className="tasks__edit-button"/>
                <p className="tasks__show-tasks-button">Show {props.tasksNumber} tasks</p>
                <img src={arrowIcon} alt="show group" className="tasks__show-tasks-arrow"/>
            </div>
        </li>
    );
}

export default TaskItem;