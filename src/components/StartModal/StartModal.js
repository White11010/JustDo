import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import image from '../../assets/images/registration.svg'
import RegistrationForm from "../../containers/RegistrationForm/RegistrationForm";
import './StartModal.scss';
import LoginForm from "../../containers/LoginForm/LoginForm";

const style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1016,
    height: 698,
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: '0px 21px 54px rgba(44, 45, 67, 0.09)',
};

function StartModal(props) {
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(250, 250, 250, 0.89)'
                    }
                }}
            >
                <Box sx={style}>
                    <img className="form__image" src={image} alt="image"/>
                    {
                        props.currentForm === 'registration' ? <RegistrationForm handleLogin={props.handleLogin}/> : <LoginForm handleRegistration={props.handleRegistration}/>
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default StartModal;