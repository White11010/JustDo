import React, {useEffect, useRef} from 'react';
import './FormSelectInput.scss'
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";

const notificationsMap = {
    'in 5 minutes': '00:05:00',
    'in 15 minutes': '00:15:00',
    'in 30 minutes': '00:30:00',
    'in 1 hour': '01:00:00',
    'in 1 day': '24:00:00'
}

function TaskNotificationSelect(props) {

    const rootEl = useRef(null);

    const [open, setOpen] = React.useState(false)
    const handleToggleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const [notification, setNotification] = React.useState(props.remindIn)
    const handleNotification = (notification) => setNotification(notification)

    useEffect(() => {
        props.handleTaskData({[props.keyWord]: notification});
    }, [notification])

    useEffect(() => {
        const onClick = e => rootEl.current.contains(e.target) || handleClose();
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const selectOption = (event) => {
        handleNotification(notificationsMap[event.target.textContent])
        handleClose()
    }

    return (
        <div className="select" ref={rootEl} style={props.style}>
            <div className="select__trigger" onClick={handleToggleOpen}>
                <p className="select__label">Notification</p>
                <p className="select__placeholder">
                    {
                        Object.keys(notificationsMap).find(key => {
                            return notificationsMap[key] === notification
                        })
                    }
                </p>
                <img src={arrowIcon} alt="show options" className="select__arrow"/>
            </div>
            {open &&
                <ul className="select__options">
                    {
                        Object.keys(notificationsMap).map(notification => {
                            return (
                                <li
                                    key={notification}
                                    className="select__option"
                                    onClick={selectOption}
                                >
                                    <p>{notification}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default TaskNotificationSelect;