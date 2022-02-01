import React from 'react';
import searchIcon from '../../assets/images/Search.svg';
import calendarIcon from '../../assets/images/Calendar.svg';
import filterIcon from '../../assets/images/bx-filter.svg';
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";
import './TasksFilters.scss'

function TasksFilters(props) {
    return (
        <div className="tasks__filters">
            <div className="tasks__search">
                <div className="tasks__filters-button">
                    <img src={searchIcon} alt="search"/>
                </div>
            </div>
            <div className="tasks__calendar">
                <div className="tasks__filters-button">
                    <img src={calendarIcon} alt="calendar"/>
                </div>
            </div>
            <div className="tasks__sort">
                <div className="tasks__sort-button">
                    <img src={filterIcon} alt="filter"/>
                    <p className="tasks__sort-title">Sort by</p>
                    <img src={arrowIcon} alt="show sort filter" className="tasks__sort-arrow"/>
                </div>
            </div>
        </div>
    );
}

export default TasksFilters;