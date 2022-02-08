import React from 'react';
import {useForm} from "react-hook-form";
import "./LoginForm.scss";
import axios from "axios";
import FormInput from "../FormInputs/FormInput";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {setAuth} from "../../features/userSlice";

function LoginFormLink(props) {
    return (
        <p className="registration__link">
            <span className="registration__link--gray">Don't have an account?</span>
            <span className="registration__link--blue" onClick={props.handleRegistration}> Check in</span>
        </p>
    );
}

function LoginForm(props) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm({ mode: "onChange" });

    const sendLoginData = (data) => {
        return axios({
            method: "post",
            url: "http://34.125.5.252:3000/api/auth/login",
            data: data
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    };

    const onSubmit = (data) => {
        sendLoginData(data)
            .then(response => {
                localStorage.setItem('authorization', response.data.token);
                dispatch(setAuth(true));
                navigate('/dashboard');
            })
            .catch(error => console.log(error.response))
    };


    return (
        <div className="login">
            <h3 className="login__title">Log in</h3>
            <LoginFormLink handleRegistration={props.handleRegistration}/>
            <form onSubmit={handleSubmit(onSubmit)} className="login__container">
                <FormInput
                    ref={register({ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, required: true })}
                    name="email"
                    type="text"
                    label="E-Mail"
                    placeholder="Enter your E-Mail"
                    style={{marginBottom: '37px'}}
                />
                <FormInput
                    ref={register({ required: true })}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    className="login__input"
                    style={{marginBottom: '10px'}}
                />
                <p className="login__recover-link">Forgot your password?</p>
                <button type="submit" disabled={!formState.isValid} className="button button--primary login__button">Login</button>
            </form>
            <p className="login__support-link">JustDo support</p>
        </div>
    );
}

export default LoginForm;