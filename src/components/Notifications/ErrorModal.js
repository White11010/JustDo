import React, {useEffect} from 'react';
import './ErrorModal.scss'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closeIcon from "../../assets/images/bx-close.svg";
import errorDesktopImage from '../../assets/images/error-desctop.svg'
import errorTabletImage from '../../assets/images/error-tablet.svg'
import {useMediaQuery} from "react-responsive";
import {useDispatch, useSelector} from "react-redux";
import {selectErrorData, selectIsError, setError} from "../../features/errorsSlice";


function ErrorModal(props) {

    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '335px' : (isTablet ? '574px' : '846px'),
        height: isMobile ? '419px' : (isTablet ? '514px' : '408px'),
        bgcolor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 21px 54px rgba(44, 45, 67, 0.09)',
        outline: 'none',
        overflow: 'hidden'
    };

    const errorData = useSelector(selectErrorData)

    const dispatch = useDispatch();

    const handleCloseError = () => {
        dispatch(setError(false));
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
                    <div className="modal__container">
                        <img src={closeIcon} alt="close" className="modal__close-icon" onClick={handleCloseError}/>
                        <div className="error-modal__container">
                            <div className="error-modal__info">
                                <h3 className="error-modal__title">{errorData.title}</h3>
                                <p className="error-modal__description">{errorData.text}</p>
                            </div>
                            <img src={isTablet ? errorTabletImage : errorDesktopImage} alt="error" className="error-modal__image"/>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ErrorModal;