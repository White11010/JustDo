import React, {useCallback} from 'react';
import RegistrationDots from "./RegistrationDots";
import './RegistrationForm.scss';
import {Controller, useForm} from "react-hook-form";
import FormInput from "../FormInputs/FormInput";
import arrowIcon from "../../assets/images/bx-chevron-left.svg";
import arrowIconWhite from "../../assets/images/bx-chevron-left-white.svg";
import {useDropzone} from "react-dropzone";
import unloadPic from "../../assets/images/pic-upload.png";

function FileUploader(props) {
    const onDrop = useCallback(acceptedFiles => {
        props.handleAddImage(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps } = useDropzone({onDrop});

    return (
        <div {...getRootProps({ className: 'dropzone', multiple: false })}>
            <input {...getInputProps()} />
            <img src={unloadPic} alt="unload file"/>
            <p className="dropzone__title"><span>Drop your image here, or </span><span className="dropzone__title--blue">browse</span></p>
            <p className="dropzone__info"><span>Supports: PNG, JPG, SVG</span><span className="dropzone__dot"/><span>Max size: 512x512 px</span></p>
            <p className="dropzone__prompt">Upload photo</p>
        </div>
    );
}

function RegistrationFormThird(props) {
    const [bgImage, setBgImage] = React.useState(arrowIcon);
    const handleMouseOver = () => setBgImage(arrowIconWhite)
    const handleMouseOut = () => setBgImage(arrowIcon)
    const handleClick = () => setBgImage(arrowIconWhite)

    const { register, handleSubmit, watch, errors, formState } = useForm({ mode: "onChange" });
    const onSubmit = data => {
        props.addRegistrationData(data);
        props.onSubmit();
    };

    return (
        <div className="registration">
            <RegistrationDots pageNumber="3"/>
            <h3 className="registration__title">One last step</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="registration__container">
                <FormInput
                    ref={register({ required: true })}
                    name="firstName"
                    type="text"
                    label="First Name"
                    placeholder="Enter your first name"
                    style={{margin: '30px 0 24px'}}
                />
                <FormInput
                    ref={register({ required: true })}
                    name="lastName"
                    type="text"
                    label="Last Name"
                    placeholder="Enter your last name"
                    style={{marginBottom: '30px'}}
                />
                <FileUploader  handleAddImage={props.handleAddImage}/>
                <div className="registration__buttons">
                    <button
                        className="button modal__back-button"
                        onClick={() => {props.handlePrevPage(); handleClick()}}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    <button type="submit" className="button button--primary registration__next-button" disabled={!formState.isValid}>Start</button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationFormThird;