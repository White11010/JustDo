import React, {useEffect, useRef} from 'react';
import searchIcon from '../../assets/images/Search.svg';
import calendarIcon from '../../assets/images/Calendar.svg';
import filterIcon from '../../assets/images/bx-filter.svg';
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";
import './TasksFilters.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectSearch, selectSort, setSearch, setSort} from "../../features/filtersSlice";

function TasksFilters(props) {

    const dispatch = useDispatch();

    //Search
    const searchString = useSelector(selectSearch)

    const searchInput = useRef(null)

    const [searchOpen, setSearchOpen] = React.useState(false)
    const handleSearchOpen = () => setSearchOpen(true)
    const handleSearchClose = () => setSearchOpen(false)

    useEffect(() => {
        searchOpen && searchInput.current.focus();
    }, [searchOpen])

    const handleSearch = (event) => {
        if (event.code === 'Enter' || event.type === 'blur') {
            dispatch(setSearch(event.target.value))
            handleSearchClose();
        }
    }

    //Sort
    const sortOption = useSelector(selectSort)

    const sortSelect = useRef(null)

    const [sortOpen, setSortOpen] = React.useState(false)
    const handleSortOpen = () => setSortOpen(true)
    const handleSortClose = () => setSortOpen(false)

    const handleSort = (event) => {
        dispatch(setSort(event.target.textContent))
        handleSortClose();
    }


    return (
        <div className="tasks__filters">
            <div className="tasks__search" onClick={() => {handleSortClose(); handleSearchOpen()}}>
                <div className="tasks__filters-button">
                    <img src={searchIcon} alt="search"/>
                </div>
                {
                    searchOpen &&
                    <input
                        type="text"
                        defaultValue={searchString}
                        className="tasks__search-input"
                        ref={searchInput}
                        onKeyPress={handleSearch}
                        onBlur={handleSearch}
                    />
                }
            </div>
            <div className="tasks__calendar">
                <div className="tasks__filters-button">
                    <img src={calendarIcon} alt="calendar"/>
                </div>
            </div>
            <div className="tasks__sort">
                <div className="tasks__sort-button" onClick={() => {handleSortOpen(); handleSearchClose()}}>
                    <img src={filterIcon} alt="filter"/>
                    <p className="tasks__sort-title">{sortOption === null ? 'Sort by' : sortOption}</p>
                    <img src={arrowIcon} alt="show sort filter" className="tasks__sort-arrow"/>
                </div>
                {
                    sortOpen &&
                    <ul className="tasks__sort-select" ref={sortSelect}>
                        <li className="tasks__sort-option" onClick={handleSort}>
                            Sort by date
                        </li>
                        <li className="tasks__sort-option" onClick={handleSort}>
                            Sort by name
                        </li>
                        <li className="tasks__sort-option" onClick={handleSort}>
                            Sort by priority
                        </li>
                    </ul>
                }
            </div>
        </div>
    );
}

export default TasksFilters;