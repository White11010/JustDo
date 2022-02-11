import React, {useEffect} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box"
import closeButton from '../../assets/images/bx-close.svg'
import './TaskCompleteModal.scss'
import logo from '../../assets/images/logo4.svg'
import logoSuccessed from '../../assets/images/logo.Success.svg'
import axios from "axios";
import {deleteTask, selectTasks, setActiveTask} from "../../features/tasksSlice";
import {useDispatch, useSelector} from "react-redux";
import API from '../../api'
import {setError} from "../../features/errorsSlice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: '0px 21px 48px rgba(0, 0, 0, 0.12)',
    outline: 'none',
};

function TaskCompeteModal(props) {

    const dispatch = useDispatch();

    const [isCompleting, setIsCompleting] = React.useState(true)
    const handleCompleting = () => setIsCompleting(false)

    const handleComplete = () => {
        const data = {}
        data.id = props.id
        API.delete(`/tasks`, {data})
            .then(res => {
                if (res.status === 200) {
                    dispatch(deleteTask(props.id))
                }
            })
            .catch(() => {
                dispatch(setError(true))
            })
    }

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
                <Box style={style}>
                    <div className="modal__container">
                        <img src={closeButton} alt="close" className="modal__close-icon" onClick={props.handleClose}/>
                        <div className="tasks__complete-modal">
                            <img src={isCompleting ? logo : logoSuccessed} alt="logo" className="tasks__complete-modal-logo"/>
                            <div className="tasks__complete-modal-container">
                                <h3 className="tasks__complete-modal-title">
                                    {
                                        isCompleting ? 'Are you sure want to' : 'Success'
                                    }
                                </h3>
                                <p className="tasks__complete-modal-subtitle">
                                    Your action successfully completed!
                                </p>
                                <div className="tasks__complete-modal-actions">
                                    {
                                        isCompleting ?
                                        <>
                                            <button
                                                className="button button--secondary tasks__complete-modal-button"
                                                onClick={props.handleClose}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="button button--primary tasks__complete-modal-button"
                                                onClick={handleCompleting}
                                            >
                                                Proceed
                                            </button>
                                        </> :
                                            <button
                                                className="button button--primary tasks__complete-modal-button"
                                                onClick={handleComplete}
                                            >
                                                Okay
                                            </button>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default TaskCompeteModal;