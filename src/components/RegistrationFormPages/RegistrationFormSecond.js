import React, { useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import StartModalTitle from "../StartModal/StartModalTitle";
import RegistrationDots from "../RegistrationForm/RegistrationDots";
import StartModalButton from "../StartModal/StartModalButton";
import '../../containers/RegistrationForm/RegistrationForm.scss';
import {FormControl, FormHelperText, TextField} from "@mui/material";
import RegistrationFormBackButton from "../RegistrationForm/RegistrationFormBackButton";
import FormInput from "../FormInputs/FormInput";


function RegistrationFormSecond(props) {
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
            <StartModalTitle title="Almost done"/>
            {/*<form onSubmit={handleSubmit(onSubmit)} className="registration">*/}
            {/*    <FormControl className="form-control">*/}
            {/*        <Controller*/}
            {/*            name="password"*/}
            {/*            type="password"*/}
            {/*            control={control}*/}
            {/*            defaultValue=""*/}
            {/*            label="Password"*/}
            {/*            rules={{ required: true, minLength: 8,}}*/}
            {/*            as={TextField}*/}
            {/*            sx={{*/}
            {/*                mt: '30px',*/}
            {/*                mb: '24px'*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </FormControl>*/}
            {/*    <FormControl className="form-control">*/}
            {/*        <Controller*/}
            {/*            name="confirmPassword"*/}
            {/*            type="password"*/}
            {/*            control={control}*/}
            {/*            defaultValue=""*/}
            {/*            label="Confirm Password"*/}
            {/*            rules={{ required: true, validate: value => value === password.current }}*/}
            {/*            as={TextField}*/}
            {/*        />*/}
            {/*    </FormControl>*/}
            {/*    <FormControl*/}
            {/*        sx={{*/}
            {/*            display: 'flex',*/}
            {/*            flexDirection: 'row',*/}
            {/*            mt: '30px',*/}
            {/*            mb: '24px'*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <RegistrationFormBackButton handlePrevPage={props.handlePrevPage}/>*/}
            {/*        <StartModalButton type="submit" disabled={!formState.isValid}/>*/}
            {/*    </FormControl>*/}
            {/*</form>*/}
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
                    <p>- spaces and line breaks must be absent</p>
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
                    <RegistrationFormBackButton handlePrevPage={props.handlePrevPage}/>
                    <StartModalButton type="submit" disabled={!formState.isValid} style={{width: '100%'}}/>
                </div>
            </form>
        </div>
    );
}


export default RegistrationFormSecond;