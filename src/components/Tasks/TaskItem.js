import React, {useEffect} from 'react';
import moment from 'moment';
import bellGreyIcon from '../../assets/images/bxs-bell-ring--gray.svg'
import bellRedIcon from '../../assets/images/bxs-bell-ring--red.svg'
import sportIcon from "../../assets/images/categories-icons/bx-color-workout.svg";
import homeIcon from "../../assets/images/categories-icons/bx-color-house.svg";
import workIcon from "../../assets/images/categories-icons/bx-color-work.svg";
import meetingsIcon from "../../assets/images/categories-icons/bx-color-meeting.svg";
import neutralPriorityIcon from "../../assets/images/gray-circle.svg";
import importantPriorityIcon from "../../assets/images/red-circle.svg";
import middlePriorityIcon from "../../assets/images/blue-circle.svg";
import lowPriorityIcon from "../../assets/images/yellow-circle.svg";
import './TaskItem.scss'
import {useSelector} from "react-redux";
import {selectCategories} from "../../features/categoriesSlice";

const categoriesIconsMap = {
    home: homeIcon,
    sport: sportIcon,
    work: workIcon,
    meetings: meetingsIcon
}

const prioritiesIconsMap = {
    Neutral: neutralPriorityIcon,
    Important: importantPriorityIcon,
    Middle: middlePriorityIcon,
    Low: lowPriorityIcon
}


function TaskItem(props) {

    const [categoryIcon, setCategoryIcon] = React.useState(null);
    const handleCategoryIcon = (icon) => setCategoryIcon(icon)

    const [categoryName, setCategoryName] = React.useState(null)
    const handleCategoryName = (name) => setCategoryName(name)

    const deadline = moment(props.deadline).utc().format('MMM DD') + ', ' + moment(props.deadline).utc().format('HH:MM A').toLowerCase()

    const categories = useSelector(selectCategories);

    const handleSelectTask = () => {
        props.selectTask(props.id)
    }

    useEffect(() => {
        categories.forEach((category) => {
            if (category.id === props.categoryId) {
                handleCategoryName(category.name)
                handleCategoryIcon(categoriesIconsMap[category.name.toLowerCase()])
            }
        })
    }, [])

    return (
        <li
            className="tasks__item"
            onClick={handleSelectTask}
        >
            <div className="tasks__circle-icon"/>
            <p className="tasks-item__title">{props.name}</p>
            <div className="tasks__line"/>
            <div className="tasks__deadline-container">
                <img src={props.priority === 'Important' ? bellRedIcon : bellGreyIcon} alt="bell icon"/>
                <p className="tasks__deadline">{deadline}</p>
            </div>
            <div className="tasks__category">
                {
                    categoryIcon !== null &&
                    <img src={categoryIcon} alt="category icon"/>
                }
                <p className="tasks__category-name">{categoryName}</p>
            </div>
            <ul className="tasks__tags-list">
                {
                    props.tags && props.tags.split(' ').map(tag => {
                        return (
                            <li
                                className="tasks__tags-item"
                                key={tag}
                            >
                                {'#' + tag}
                            </li>
                        )
                    })
                }
            </ul>
            <img
                src={prioritiesIconsMap[props.priority]}
                alt={props.priority}
                className="tasks__priority-icon"
            />
        </li>
    );
}

export default TaskItem;