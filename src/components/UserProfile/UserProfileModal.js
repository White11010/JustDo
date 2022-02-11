import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UserProfileModalSettings from "./UserProfileModalSettings";
import UserProfileModalAccount from "./UserProfileModalAccount";
import {useMediaQuery} from "react-responsive";
import API from '../../api'
import {setError} from "../../features/errorsSlice";
import {useDispatch} from "react-redux";



function UserProfileModal(props) {

    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    const style = {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        boxSizing: 'border-box',
        transform: 'translate(-50%, -50%)',
        width: isMobile? '335px' : (isTablet ? '708px' : '947px'),
        height: isMobile? 'auto' : (isTablet ? '812px' : '850px'),
        bgcolor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 21px 48px rgba(0, 0, 0, 0.12)',
        outline: 'none'
    };

    const dispatch = useDispatch();

    const deleteUser = () => {
        API.delete(`/users`)
            .then(response => {
                if (response.status === 200) {
                    props.logOut()
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
                <Box sx={style}>
                    {
                        !isMobile &&
                        <UserProfileModalSettings/>
                    }
                    <UserProfileModalAccount handleModalClose={props.handleModalClose} deleteUser={deleteUser}/>
                </Box>
            </Modal>
        </div>
    );
}

export default UserProfileModal;