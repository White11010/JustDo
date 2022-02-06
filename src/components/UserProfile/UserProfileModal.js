import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import closeIcon from "../../assets/images/bx-close.svg"
import './UserProfileModal.scss'
import UserProfileModalSettings from "./UserProfileModalSettings";
import UserProfileModalAccount from "./UserProfileModalAccount";
import axios from "axios";


const style = {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    boxSizing: 'border-box',
    transform: 'translate(-50%, -50%)',
    width: '947px',
    height: '850px',
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: '0px 21px 48px rgba(0, 0, 0, 0.12)',
    outline: 'none'
};

function UserProfileModal(props) {


    const deleteUser = () => {
        sendDeleteUser()
            .then(response => {
                if (response.status === 200) {
                    props.logOut()
                }
            })
    }

    const sendDeleteUser = () => {
        const token = localStorage.getItem('authorization');

        return axios({
            method: "delete",
            url: "http://34.125.5.252:3000/api/users",
            headers: {'authorization': 'Bearer ' + token},
        })
            .then(response => {
                if (response.status === 200) {
                    return response;
                }
            })
            .catch(error => {
                throw error;
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
                <Box sx={style}>
                    <UserProfileModalSettings/>
                    <UserProfileModalAccount handleModalClose={props.handleModalClose} deleteUser={deleteUser}/>
                </Box>
            </Modal>
        </div>
    );
}

export default UserProfileModal;