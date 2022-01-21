import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { TextField,  FormControl, } from '@mui/material';
import StartModalTitle from "../StartModal/StartModalTitle";
import RegistrationDots from "../RegistrationForm/RegistrationDots";
import StartModalButton from "../StartModal/StartModalButton";
import '../../containers/RegistrationForm/RegistrationForm.scss';
import RegistrationAgreement from "../RegistrationForm/RegistrationAgreement";
import RegistrationFormLink from "../RegistrationForm/RegistrationFormLink";
import FormInput from "../FormInputs/FormInput";


function RegistrationFormFirst(props) {
    const { register, handleSubmit, watch, errors, formState } = useForm({ mode: "onChange" });
    const onSubmit = data => {
        props.addRegistrationData(data);
        props.handleNextPage();
    };

    return (
        <div className="registration">
            <RegistrationDots pageNumber="1"/>
            <StartModalTitle title="Registration"/>
            <RegistrationFormLink  handleLogin={props.handleLogin}/>
            {/*<form onSubmit={handleSubmit(onSubmit)} className="registration-form__container">*/}
            {/*    <FormControl*/}
            {/*        sx={{*/}
            {/*            height: '60px',*/}
            {/*            border: '1px solid #D7D7D7'*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Controller*/}
            {/*            name="email"*/}
            {/*            control={control}*/}
            {/*            defaultValue=""*/}
            {/*            label="Email"*/}
            {/*            rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}*/}
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
            {/*        <StartModalButton type="submit" disabled={!formState.isValid}/>*/}
            {/*    </FormControl>*/}
            {/*</form>*/}
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