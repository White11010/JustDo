import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GroupsCreationForm from "./GroupsCreationForm";

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '524px',
    height: '360px',
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: '0px 21px 48px rgba(0, 0, 0, 0.12)',
    outline: 'none'
};

function GroupsCreationModal(props) {
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleModalClose}
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(250, 250, 250, 0.89)'
                    }
                }}
            >
                <Box sx={style}>
                    <GroupsCreationForm handleModalClose={props.handleModalClose}/>
                </Box>
            </Modal>
        </div>
    );
}

export default GroupsCreationModal;