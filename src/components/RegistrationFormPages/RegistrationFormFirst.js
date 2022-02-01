import React from 'react';
import { useForm, Controller } from "react-hook-form";
import StartModalTitle from "../StartModal/StartModalTitle";
import RegistrationDots from "../RegistrationForm/RegistrationDots";
import StartModalButton from "../StartModal/StartModalButton";
import '../../containers/RegistrationForm/RegistrationForm.scss';
import RegistrationAgreement from "../RegistrationForm/RegistrationAgreement";
import RegistrationFormLink from "../RegistrationForm/RegistrationFormLink";
import FormInput from "../FormInputs/FormInput";
import axios from "axios";


function RegistrationFormFirst(props) {
    const { register, handleSubmit, watch, errors, formState } = useForm({ mode: "onChange" });
    const onSubmit = data => {
        props.addRegistrationData(data);
        sendRegistrationData(data)
            .then((response) => {
                console.log(response.status)
                if (response.status == 200) {
                    props.handleNextPage();
                }
            })
            .catch(error => console.log(error.response));
        // props.handleNextPage();
    };

    const sendRegistrationData = (data) => {

        return axios({
            method: "post",
            url: "http://34.125.5.252:3000/api/auth/checkemail",
            data: data
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    };

    return (
        <div className="registration">
            <RegistrationDots pageNumber="1"/>
            <StartModalTitle title="Registration"/>
            <RegistrationFormLink  handleLogin={props.handleLogin}/>
            <form onSubmit={handleSubmit(onSubmit)} className="registration__container">
                <FormInput
                    ref={register({ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, required: true })}
                    name="email"
                    type="text"
                    label="E-Mail"
                    placeholder="Enter your E-Mail"
                    style={{marginBottom: '37px'}}
                />
                <div className="registration__buttons">
                    <StartModalButton type="submit" disabled={!formState.isValid} style={{width: '100%', marginBottom: '30px'}}/>
                </div>
            </form>
            <RegistrationAgreement/>
        </div>
    );
}

export default RegistrationFormFirst;