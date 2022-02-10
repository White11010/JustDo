import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './TaskCreationModal.scss'
import TaskCreationForm from "../Tasks/TaskCreationForm";
import TaskEditingForm from "../Tasks/TaskEditingForm";
import {useMediaQuery} from "react-responsive";
import closeIcon from "../../assets/images/bx-close.svg";


function TaskCreationModal(props) {

    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})

    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isTablet ? 'auto' : '947px',
        height: isTablet ? 'auto' : '734px',
        bgcolor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 21px 48px rgba(0, 0, 0, 0.12)',
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
                    <div className="task-modal__container">
                        <img src={closeIcon} alt="close" className="modal__close-icon" onClick={props.handleClose}/>
                        <h3 className="task-modal__title">
                            {
                                props.isCreation ?
                                    'Task Creation' :
                                    'Edit task'
                            }
                        </h3>
                        {
                            props.isCreation ?
                                <TaskCreationForm handleCose={props.handleClose}/> :
                                <TaskEditingForm handleCose={props.handleClose}/>
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default TaskCreationModal;