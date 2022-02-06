import React from 'react';
import StartModalTitle from "../../components/StartModal/StartModalTitle";
import {Controller, useForm} from "react-hook-form";
import "./LoginForm.scss";
import axios from "axios";
import LoginFormLink from "../../components/LoginForm/LoginFormLink";
import FormInput from "../../components/FormInputs/FormInput";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {setAuth} from "../../features/userSlice";

function LoginForm(props) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { register, handleSubmit, watch, errors, formState } = useForm({ mode: "onChange" });

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
            <StartModalTitle title="Log in"/>
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