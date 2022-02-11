import React, { useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import RegistrationDots from "./RegistrationDots";
import './RegistrationForm.scss';
import arrowIcon from '../../assets/images/bx-chevron-left.svg'
import arrowIconWhite from '../../assets/images/bx-chevron-left-white.svg'
import FormInput from "../FormInputs/FormInput";


function RegistrationFormSecond(props) {
    const [bgImage, setBgImage] = React.useState(arrowIcon);
    const handleMouseOver = () => setBgImage(arrowIconWhite)
    const handleMouseOut = () => setBgImage(arrowIcon)
    const handleClick = () => setBgImage(arrowIconWhite)

    const { register, handleSubmit, watch, errors, formState } = useForm({ mode: "onChange" });
    const password = useRef({});
    password.current = watch("password");

    const onSubmit = (data) => {
        props.addRegistrationData({password: data.password});
        props.handleNextPage();
    };

    const handleBack = (event) => {
        event.preventDefault();
        props.handlePrevPage();
        handleClick()
    }


    return (
        <div className="registration">
            <RegistrationDots pageNumber="2"/>
            <h3 className="registration__title">Almost done</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="registration__container">
                <FormInput
                    ref={register({ required: true, minLength: 8,  pattern:/[A-Z{2,}](?=.*[0-9])(?=.*[^0-9a-zA-Z])/g, })}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    style={{margin: '37px 0'}}
                    errorText={errors.password?.type === "pattern" && 'Enter a valid password' || errors.password?.type === "minLength" && 'Password should be 8 symbols at lest' }
                />
                <div className="registration__rules">
                    <p>- at least 8 characters</p>
                    <p>- at least 2 capital letters</p>
                    <p>- at least 1 special character (!, @, etc)</p>
                    <p>- at least 1 digit</p>
                    <p>- spaces and line breaks must</p>
                    <p>&nbsp; be absent</p>
                </div>
                <FormInput
                    ref={register({ validate: value => value === password.current})}
                    name="password_confirmation"
                    type="password"
                    label="Password Confirmation"
                    placeholder="Enter your password"
                    style={{marginBottom: '30px'}}
                    errorText={errors.password_confirmation && "The passwords do not match"}
                />
                <div className="registration__buttons">
                    <button type="submit" className="button button--primary registration__next-button" disabled={!formState.isValid}>Next</button>
                    <button
                        className="button modal__back-button"
                        onClick={handleBack}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                </div>
            </form>
        </div>
    );
}


export default RegistrationFormSecond;