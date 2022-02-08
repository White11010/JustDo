import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import image from '../../assets/images/registration.svg'
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import './StartModal.scss';
import LoginForm from "../LoginForm/LoginForm";
import closeIcon from "../../assets/images/bx-close.svg";
import {useMediaQuery} from "react-responsive";

function StartModal(props) {
    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '335px' : (isTablet ? '526px' : '1016px'),
        height: isTablet ? 'auto' : '698px',
        bgcolor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 21px 54px rgba(44, 45, 67, 0.09)',
        outline: 'none'
    };


    return (
        <div>
            <Modal
                open={props.open}
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(250, 250, 250, 0.89)'
                    }
                }}
            >
                <Box sx={style}>
                    <div className="start-modal__container">
                        <img src={closeIcon} alt="close" className="modal__close-icon" onClick={props.handleClose}/>
                        {
                            !isTablet &&
                            <img className="form__image" src={image} alt="image"/>
                        }
                        {
                            props.currentForm === 'registration' ? <RegistrationForm handleLogin={props.handleLogin}/> : <LoginForm handleRegistration={props.handleRegistration}/>
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default StartModal;