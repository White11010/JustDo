import React from 'react';
import { useForm, Controller } from "react-hook-form";
import RegistrationDots from "./RegistrationDots";
import './RegistrationForm.scss';
import FormInput from "../FormInputs/FormInput";
import API from '../../api'
import {setError} from "../../features/errorsSlice";
import {useDispatch} from "react-redux";

function RegistrationFormLink(props) {
    return (
        <p className="registration__link">
            <span className="registration__link--gray">Already a member?</span>
            <span className="registration__link--blue" onClick={props.handleLogin}> Log in</span>
        </p>
    );
}

function RegistrationAgreement() {
    return (
        <p className="registration__agreement">
            <span className="registration__agreement--gray">Continuing with Email, you agree to the </span>
            <span className="registration__agreement--blue">Terms of Use </span>
            <span className="registration__agreement--gray">and </span>
            <span className="registration__agreement--blue">Privacy Policy.</span>
        </p>
    );
}

function RegistrationFormFirst(props) {

    const dispatch = useDispatch()

    const [isEmailUnique, setIsEmailUnique] = React.useState(true)
    const handleEmail = () => setIsEmailUnique(false)

    const { register, handleSubmit, errors, formState } = useForm({ mode: "onChange" });

    const onSubmit = (data, event) => {
        event.preventDefault();

        props.addRegistrationData(data);

        API.post(`auth/checkEmail`, data)
            .then((response) => {
                if (response.status === 200) {
                    props.handleNextPage();
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    handleEmail();
                } else {
                    dispatch(setError(true))
                }
            });
    };

    return (
        <div className="registration">
            <RegistrationDots pageNumber="1"/>
            <h3 className="registration__title">Registration</h3>
            <RegistrationFormLink  handleLogin={props.handleLogin}/>
            <form onSubmit={handleSubmit(onSubmit)} className="registration__container">
                <FormInput
                    ref={register({ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, required: true })}
                    name="email"
                    type="text"
                    label="E-Mail"
                    placeholder="Enter your E-Mail"
                    style={{marginBottom: '37px'}}
                    errorText={!isEmailUnique &&  'The email already exists' ||  errors.email?.type === "pattern" && 'Enter a valid email' || errors.email?.type === "required" && 'Email is required'}
                />
                <div className="registration__buttons">
                    <button type="submit" className="button button--primary registration__next-button" disabled={!formState.isValid}>Next</button>
                </div>
            </form>
            <RegistrationAgreement/>
        </div>
    );
}

export default RegistrationFormFirst;