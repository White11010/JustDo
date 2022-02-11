import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import "./LoginForm.scss";
import FormInput from "../FormInputs/FormInput";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, setAuth} from "../../features/userSlice";
import API from '../../api'
import {setError} from "../../features/errorsSlice";

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

    const isAuth = useSelector(selectIsAuth)

    const { register, handleSubmit, formState } = useForm({ mode: "onChange" });

    const [loginError, setLoginError] = React.useState(false)
    const handleSetError = () => setLoginError(true)

    const onSubmit = (data) => {
        API.post(`auth/login`, data)
            .then(response => {
                localStorage.setItem('authorization', response.data.token);
                dispatch(setAuth(true));
                navigate('/dashboard');
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    handleSetError();
                } else {
                    dispatch(setError(true))
                }
            })
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/dashboard');
        }
    }, [isAuth])


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
                    errorText={loginError && 'Email or password is incorrect!'}
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