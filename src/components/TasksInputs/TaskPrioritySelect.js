import React, {useEffect, useRef} from 'react';
import './FormSelectInput.scss'
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";
import neutralPriorityIcon from "../../assets/images/gray-circle.svg";
import importantPriorityIcon from "../../assets/images/red-circle.svg";
import middlePriorityIcon from "../../assets/images/blue-circle.svg";
import lowPriorityIcon from "../../assets/images/yellow-circle.svg";

const prioritiesIconsMap = {
    Neutral: neutralPriorityIcon,
    Important: importantPriorityIcon,
    Middle: middlePriorityIcon,
    Low: lowPriorityIcon
}

function TaskPrioritySelect(props) {

    const rootEl = useRef(null);

    const [open, setOpen] = React.useState(false)
    const handleToggleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const [priority, setPriority] = React.useState(props.priority)
    const handlePriority = (priority) => setPriority(priority)

    useEffect(() => {
        props.handleTaskData({[props.keyWord]: priority});
    }, [priority])

    useEffect(() => {
        const onClick = e => rootEl.current.contains(e.target) || handleClose();
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const selectOption = (event) => {
        handlePriority(event.target.textContent)
        handleClose()
    }

    return (
        <div className="select" ref={rootEl} style={props.style}>
            <div className="select__trigger" onClick={handleToggleOpen}>
                <p className="select__label">Set Color Priority</p>
                <img src={prioritiesIconsMap[priority]} alt="img" className="select__icon"/>
                <p className="select__placeholder">{priority}</p>
                <img src={arrowIcon} alt="show options" className="select__arrow"/>
            </div>
            { open &&
                <ul className="select__options">
                    {
                        Object.keys(prioritiesIconsMap).map(priorityName => {
                            return(
                                <li
                                    key={priorityName}
                                    className="select__option"
                                    onClick={selectOption}
                                >
                                    <img src={prioritiesIconsMap[priorityName]} alt="img" className="select__icon"/>
                                    <p>{priorityName}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    );
}

export default TaskPrioritySelect;