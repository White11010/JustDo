import React from 'react';
import "./UserProfileModalAccount.scss"
import FormInput from "../FormInputs/FormInput";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {selectUserData, setUserData} from "../../features/userSlice";
import axios from "axios";
import UserProfileFileUploader from "./UserProfileFileUploader";
import closeIcon from "../../assets/images/bx-close.svg"

function UserProfileModalAccount(props) {
    const dispatch = useDispatch();

    const userData = useSelector(selectUserData)

    const [userUpdatedData, setUserUpdatedData] = React.useState({})
    const handleUserUpdatedData = (data) => setUserUpdatedData(Object.assign(userUpdatedData, data));

    const [image, setImage] = React.useState(null);
    const handleAddImage = (imageData) => setImage(imageData);

    const {register, handleSubmit} = useForm({mode: "onChange"});


    const onSubmit = (data) => {
        handleUserUpdatedData(data)
        setFormData()
        sendUserDataUpdated()
            .then(response => {
                if (response.status === 200) {
                    dispatch(setUserData(response.data.data))
                    props.handleModalClose();
                }
            })
    };

    const fd = new FormData();

    const setFormData = () => {
        for (const key in userUpdatedData) {
            fd.append(key, userUpdatedData[key])
        }
        fd.append('image', image);
    }

    const sendUserDataUpdated = () => {
        const token = localStorage.getItem('authorization');

        return axios({
            method: "put",
            url: "http://34.125.5.252:3000/api/users",
            headers: {'authorization': 'Bearer ' + token},
            data: fd
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
        <div className="user-modal__account">
            <img src={closeIcon} alt="close" className="modal__close-icon" onClick={props.handleModalClose}/>
            <div>
                <h3 className="user-modal__account-title">Account</h3>
                <p className="user-modal__account-subtitle">Profile</p>
                {
                    userData &&
                    <div className="user-modal__account-photo-container">
                        <img
                            src={'http://34.125.5.252:3000/api/' + userData.avatarUrl}
                             alt="user avatar"
                             className="user-modal__account-photo"
                        />
                        <UserProfileFileUploader
                            onFileSelect={handleAddImage}
                        />
                        <button
                            className="button button--cancel user-modal__account-photo-button"
                        >
                            Delete
                        </button>
                        <p className="user-modal__account-photo-info">Pick a photo up to 4MB.</p>
                    </div>
                }
                {
                    userData &&
                    <form onSubmit={handleSubmit(onSubmit)} className="user-modal__account-main-form">
                        <FormInput
                            ref={register({required: true})}
                            name="firstName"
                            type="text"
                            label="First Name"
                            placeholder="Enter your first name"
                            value={userData.firstName}
                            style={{
                                flexBasis: 'calc(50% - 12px)',
                                marginBottom: '27px',
                                marginRight: '12px'
                            }}
                        />
                        <FormInput
                            ref={register({required: true})}
                            name="lastName"
                            type="text"
                            label="Last Name"
                            placeholder="Enter your last name"
                            value={userData.lastName}
                            style={{
                                flexBasis: 'calc(50% - 12px)',
                                marginBottom: '27px',
                                marginLeft: '12px'
                            }}
                        />
                        <FormInput
                            ref={register({required: true})}
                            name="email"
                            type="text"
                            label="E-mail"
                            placeholder="Enter your E-Mail"
                            value={userData.email}
                            style={{
                                flexBasis: 'calc(50% - 12px)',
                                marginBottom: '30px',
                                marginRight: '12px'
                            }}
                        />
                        <div className="user-modal__account-actions">
                            <button className="button button--secondary user-modal__account-cancel-button"
                                    onClick={props.handleModalClose}>Cancel
                            </button>
                            <button className="button button--primary user-modal__account-update-button" type="submit">Update</button>
                        </div>

                    </form>
                }
                {
                    userData &&
                    <div className="user-modal__account-password-container">
                        <p className="user-modal__account-password-title">Password</p>
                        <button
                            className="button button--secondary user-modal__account-password-button">Change
                            password
                        </button>
                    </div>
                }
                <div className="user-modal__account-line"/>
                {
                    userData &&
                    <div className="user-modal__account-delete-container">
                        <p className="user-modal__account-delete-title">Delete account</p>
                        <button className="button button--cancel user-modal__account-password-button"
                                onClick={props.deleteUser}>Delete account
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserProfileModalAccount;