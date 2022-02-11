import React, {useEffect} from 'react';
import './NotificationModal.scss'
import {useMediaQuery} from "react-responsive";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closeIcon from "../../assets/images/bx-close.svg";
import notificationImageDesktop from '../../assets/images/notification-image-desktop.png'
import bellIcon from '../../assets/images/notification-bell.svg'
import moment from "moment";


function NotificationModal(props) {
    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '335px' : (isTablet ? '574px' : '905'),
        height: isMobile ? '419px' : (isTablet ? '514px' : '461'),
        bgcolor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 21px 54px rgba(44, 45, 67, 0.09)',
        outline: 'none',
        overflow: 'hidden'
    };

    const handleClose = () => {
        props.handleNotificationId(null);
    }

    const remindIn = moment(props.notificationData.deadline).diff(moment(props.notificationData.remindAt), 'minutes')

    const [remindInString, setRemindInString] = React.useState('')


    useEffect(() => {
        switch (remindIn) {
            case 5:
                setRemindInString('5 minutes')
            case 15:
                setRemindInString('15 minutes')
            case 30:
                setRemindInString('30 minutes')
            case 60:
                setRemindInString('1 hour')
            case 1440:
                setRemindInString('1 day')
        }
    }, [])


    return (
        <Modal
            open={props.open}
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(250, 250, 250, 0.89)'
                }
            }}
        >
            <Box sx={style}>
                <div className="modal__container">
                    <img src={closeIcon} alt="close" className="modal__close-icon" onClick={handleClose}/>
                    <div className="notification-modal__container">
                        <img src={notificationImageDesktop} alt="notification" className="notification-modal__image"/>
                        <div className="notification-modal__info">
                            <p className="notification-modal__title">
                                <img src={bellIcon} alt="bell" className="notification-modal__bell-icon"/>
                                <span>{props.userData.firstName + ' ' + props.userData.lastName[0].toUpperCase() + '., '}</span>
                                <span className="notification-modal__title--bold">Don’t forget</span>
                            </p>
                            <p className="notification-modal__message">
                                <span>In </span>
                                <span className="notification-modal__message-time">
                                    {
                                        remindInString
                                    }
                                </span>
                                <span>, you should complete the task "</span>
                                <span className="notification-modal__message-title">{props.notificationData.name}</span>
                                <span>"</span>
                            </p>
                            <button className="button button--primary notification-modal__submit-button" onClick={handleClose}>Okay</button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default NotificationModal;