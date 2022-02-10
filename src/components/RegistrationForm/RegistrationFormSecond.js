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

    const onSubmit = data => {
        props.addRegistrationData({password: data.password});
        props.handleNextPage();
    };


    return (
        <div className="registration">
            <RegistrationDots pageNumber="2"/>
            <h3 className="registration__title">Almost done</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="registration__container">
                <FormInput
                    ref={register({ required: true, minLength: 8, pattern: /[A-Z]{2}/ })}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    style={{margin: '37px 0'}}
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
                    ref={register({ validate: value => value === password.current })}
                    name="password-confirmation"
                    type="password"
                    label="Password Confirmation"
                    placeholder="Enter your password"
                    style={{marginBottom: '30px'}}
                />
                <div className="registration__buttons">
                    <button
                        className="button modal__back-button"
                        onClick={() => {props.handlePrevPage(); handleClick()}}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    <button type="submit" className="button button--primary registration__next-button" disabled={!formState.isValid}>Next</button>
                </div>
            </form>
        </div>
    );
}


export default RegistrationFormSecond;