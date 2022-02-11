import React, {useRef} from 'react';
import "./UserProfileModalAccount.scss"
import FormInput from "../FormInputs/FormInput";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {selectUserData, setUserData} from "../../features/userSlice";
import UserProfileFileUploader from "./UserProfileFileUploader";
import closeIcon from "../../assets/images/bx-close.svg"
import {useMediaQuery} from "react-responsive";
import UserProfileModalSettings from "./UserProfileModalSettings";
import API from '../../api'
import {setError} from "../../features/errorsSlice";
import UserProfileAvatarPlaceholder from "./UserProfileAvatarPlaceholder";

function UserProfileModalAccount(props) {
    const dispatch = useDispatch();

    const userData = useSelector(selectUserData)

    const [userUpdatedData, setUserUpdatedData] = React.useState({})
    const handleUserUpdatedData = (data) => setUserUpdatedData(Object.assign(userUpdatedData, data));

    const [image, setImage] = React.useState(null);
    const handleAddImage = (imageData) => setImage(imageData);
    const handleDeleteImage = () => setImage(null)

    const [passwordOpen, setPasswordOpen] = React.useState(false)
    const handlePasswordOpen = () => setPasswordOpen(true)

    const {register, handleSubmit, watch, errors} = useForm({mode: "onChange"});
    const password = useRef({});
    password.current = watch("newPassword");


    const onSubmit = (data) => {
        handleUserUpdatedData(data)
        setFormData()
        API.put(`users`, fd)
            .then(response => {
                if (response.status === 200) {
                    dispatch(setUserData(response.data.data))
                    props.handleModalClose();
                }
            })
            .catch((error) => {
                console.log(error)
                dispatch(setError(true))
            })
    };

    const fd = new FormData();

    const setFormData = () => {
        for (const key in userUpdatedData) {
            fd.append(key, userUpdatedData[key])
        }
        fd.append('image', image);
    }

    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    return (
        <div className="user-modal__account">
            <img src={closeIcon} alt="close" className="modal__close-icon" onClick={props.handleModalClose}/>
            <div>
                <h3 className="user-modal__account-title">Account</h3>
                {
                    isMobile &&
                    <UserProfileModalSettings/>
                }
                <p className="user-modal__account-subtitle">Profile</p>
                {
                    userData &&
                    <div className="user-modal__account-photo-container">
                        <div className="user-modal__account-photo-wrapper">
                            {
                                userData.avatarUrl === null ?
                                    <UserProfileAvatarPlaceholder
                                        firstName={userData.firstName}
                                        lastName={userData.lastName}
                                    /> :
                                    <img
                                        src={process.env.REACT_APP_API_URL + '/' + userData.avatarUrl}
                                        alt="user avatar"
                                        className="user-modal__account-photo"
                                    />
                            }
                        </div>
                        <div className="user-modal__account-photo-actions">
                            <UserProfileFileUploader
                                onFileSelect={handleAddImage}
                            />
                            <button
                                className="button button--cancel user-modal__account-photo-button"
                                onClick={handleDeleteImage}
                            >
                                Delete
                            </button>
                        </div>
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
                            style={
                                isMobile ? {
                                    flexBasis: '100%',
                                    marginBottom: '31px',
                                } : (isTablet ? {
                                    flexBasis: 'calc(50% - 8px)',
                                    marginBottom: '27px',
                                    marginRight: '8px'
                                } : {
                                    flexBasis: 'calc(50% - 8px)',
                                    marginBottom: '27px',
                                    marginRight: '12px'
                                })
                            }
                        />
                        <FormInput
                            ref={register({required: true})}
                            name="lastName"
                            type="text"
                            label="Last Name"
                            placeholder="Enter your last name"
                            value={userData.lastName}
                            style={
                                isMobile ? {
                                    flexBasis: '100%',
                                    marginBottom: '31px',
                                } : (isTablet ? {
                                    flexBasis: 'calc(50% - 8px)',
                                    marginBottom: '27px',
                                    marginLeft: '8px'
                                } : {
                                    flexBasis: 'calc(50% - 12px)',
                                    marginBottom: '27px',
                                    marginRight: '12px'
                                })
                            }
                        />
                        <FormInput
                            ref={register({required: true})}
                            name="email"
                            type="text"
                            label="E-mail"
                            placeholder="Enter your E-Mail"
                            value={userData.email}
                            style={
                                isTablet ? {
                                    flexBasis: '100%',
                                    marginBottom: '30px',
                                } : {
                                    flexBasis: 'calc(50% - 12px)',
                                    marginBottom: '30px',
                                    marginLeft  : '12px'
                                }
                            }
                        />
                        <div className="user-modal__account-actions">
                            <button className="button button--secondary user-modal__account-cancel-button"
                                    onClick={props.handleModalClose}>Cancel
                            </button>
                            <button className="button button--primary user-modal__account-update-button"
                                   onClick={handleSubmit(onSubmit)}>Update
                            </button>
                        </div>

                    </form>
                }
                {
                    userData &&
                    <div className="user-modal__account-password-container">
                        <p className="user-modal__account-password-title">Password</p>
                        {
                            passwordOpen ?
                                <form onSubmit={handleSubmit(onSubmit)} className="user-modal__account-password-form">
                                    <FormInput
                                        ref={register({required: true})}
                                        name="currentPassword"
                                        type="password"
                                        label="Current Password"
                                        placeholder="Enter your current password"
                                        value={null}
                                        style={
                                            isTablet ? {
                                                flexBasis: '100%',
                                                marginBottom: '21px',
                                            } : {
                                                flexBasis: 'calc(50% - 12px)',
                                                marginRight: '100px',
                                                marginBottom: '27px',
                                            }
                                        }
                                    />
                                    <FormInput
                                        ref={register({ required: true, minLength: 8,  pattern:/[A-Z{2,}](?=.*[0-9])(?=.*[^0-9a-zA-Z])/g, })}
                                        name="newPassword"
                                        type="password"
                                        label="New Password"
                                        placeholder="Enter new password"
                                        value={null}
                                        style={
                                            isMobile ? {
                                                flexBasis: '100%',
                                                marginBottom: '29px',
                                            } : (isTablet ? {
                                                flexBasis: 'calc(50% - 8px)',
                                                marginRight: '8px',
                                            } : {
                                                flexBasis: 'calc(50% - 12px)',
                                                marginRight: '12px',
                                                marginBottom: '27px',
                                            })

                                        }
                                        errorText={errors.newPassword?.type === "pattern" && 'Enter a valid password' || errors.newPassword?.type === "minLength" && 'Password should be 8 symbols at lest' }
                                    />
                                    <FormInput
                                        ref={register({ validate: value => value === password.current})}
                                        name="password_confirmation"
                                        type="password"
                                        label="Confirm Password"
                                        placeholder="Confirm new password"
                                        value={null}
                                        style={
                                            isMobile ? {
                                                flexBasis: '100%',
                                            } : (isTablet ? {
                                                flexBasis: 'calc(50% - 8px)',
                                                marginLeft: '8px',
                                            } : {
                                                flexBasis: 'calc(50% - 12px)',
                                                marginLeft: '12px',
                                                marginBottom: '27px',
                                            })
                                        }
                                        errorText={errors.password_confirmation && "The passwords do not match"}
                                    />
                                </form>
                                :
                                <button className="button button--secondary user-modal__account-password-button" onClick={handlePasswordOpen}>
                                    Change password
                                </button>
                        }
                    </div>
                }
                <div className="user-modal__account-line"/>
                {
                    userData &&
                    <div className="user-modal__account-delete-container">
                        <p className="user-modal__account-delete-title">Delete account</p>
                        <button className="button button--cancel user-modal__account-password-button user-modal__account-delete-button"
                                onClick={props.deleteUser}>Delete account
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserProfileModalAccount;