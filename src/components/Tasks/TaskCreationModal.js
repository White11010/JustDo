import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './TasksCreationModal.scss'
import TaskCreationForm from "./TaskCreationForm";
import TaskEditingForm from "./TaskEditingForm";

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    boxSizing: 'border-box',
    padding: '108px 64px',
    transform: 'translate(-50%, -50%)',
    width: '947px',
    height: '734px',
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: '0px 21px 48px rgba(0, 0, 0, 0.12)',
};

function TaskCreationModal(props) {
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
                </Box>
            </Modal>
        </div>
    );
}

export default TaskCreationModal;