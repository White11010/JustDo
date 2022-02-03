import React, {useEffect, useRef} from 'react';
import {selectCategories} from "../../features/categoriesSlice";
import {useSelector} from "react-redux";
import './FormSelectInput.scss'
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";
import homeIcon from "../../assets/images/categories-icons/bx-color-house.svg";
import sportIcon from "../../assets/images/categories-icons/bx-color-workout.svg";
import workIcon from "../../assets/images/categories-icons/bx-color-work.svg";
import meetingsIcon from "../../assets/images/categories-icons/bx-color-meeting.svg";

const categoriesIconsMap = {
    home: homeIcon,
    sport: sportIcon,
    work: workIcon,
    meetings: meetingsIcon
}


function TaskCategorySelect(props) {

    const rootEl = useRef(null);

    const categories = useSelector(selectCategories)

    const [open, setOpen] = React.useState(false)
    const handleToggleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const [category, setCategory] = React.useState(categories.find(category => {
        return category.id === props.categoryId
    }))

    const handleCategory = (categoryName) => setCategory(categories.find(category => {
        return category.name === categoryName
    }));

    useEffect(() => {
        props.handleTaskData({[props.keyWord]: category.id})
    }, [category])

    useEffect(() => {
        const onClick = e => rootEl.current.contains(e.target) || handleClose();
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const selectOption = (event) => {
        handleCategory(event.target.textContent)
        handleClose()
    }


    return (
        <div className="select" ref={rootEl} style={props.style}>
            <div className="select__trigger" onClick={handleToggleOpen}>
                <p className="select__label">Set Category</p>
                {
                    category.icon !== null &&
                    <img src={categoriesIconsMap[category.icon]} alt="img" className="select__icon"/>
                }
                <p className="select__placeholder">{category.name}</p>
                <img src={arrowIcon} alt="show options" className="select__arrow"/>
            </div>
            { open &&
                <ul className="select__options">
                    {
                        categories.map(category => {
                            return(
                                <li
                                    key={category.id}
                                    className="select__option"
                                    onClick={selectOption}
                                >
                                    {
                                        category.icon != null &&
                                        <img src={categoriesIconsMap[category.icon]} alt="img" className="select__icon"/>
                                    }
                                    <p>{category.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}


export default TaskCategorySelect;