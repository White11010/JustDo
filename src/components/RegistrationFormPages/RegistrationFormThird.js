import React from 'react';
import StartModalTitle from "../StartModal/StartModalTitle";
import RegistrationDots from "../RegistrationForm/RegistrationDots";
import '../../containers/RegistrationForm/RegistrationForm.scss';
import {FormControl, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import StartModalButton from "../StartModal/StartModalButton";
import RegistrationFormBackButton from "../RegistrationForm/RegistrationFormBackButton";
import FileUploader from "../RegistrationForm/FileUploader";
import FormInput from "../FormInputs/FormInput";

function RegistrationFormThird(props) {
    const { register, handleSubmit, watch, errors, formState } = useForm({ mode: "onChange" });
    const onSubmit = data => {
        props.addRegistrationData(data);
        props.onSubmit();
    };

    return (
        <div className="registration">
            <RegistrationDots pageNumber="3"/>
            <StartModalTitle title="One last step"/>
            {/*<form onSubmit={handleSubmit(onSubmit)} className="registration-form__container">*/}
            {/*    <FormControl className="form-control">*/}
            {/*        <Controller*/}
            {/*            name="firstName"*/}
            {/*            control={control}*/}
            {/*            defaultValue=""*/}
            {/*            label="First Name"*/}
            {/*            rules={{ required: true }}*/}
            {/*            as={TextField}*/}
            {/*            sx={{*/}
            {/*                mt: '30px',*/}
            {/*                mb: '24px'*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </FormControl>*/}
            {/*    <FormControl className="form-control">*/}
            {/*        <Controller*/}
            {/*            name="lastName"*/}
            {/*            control={control}*/}
            {/*            defaultValue=""*/}
            {/*            label="Last Name"*/}
            {/*            rules={{ required: true }}*/}
            {/*            as={TextField}*/}
            {/*        />*/}
            {/*    </FormControl>*/}
            {/*    <FileUploader  handleAddImage={props.handleAddImage}/>*/}
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
                    <RegistrationFormBackButton handlePrevPage={props.handlePrevPage}/>
                    <StartModalButton type="submit" disabled={!formState.isValid} style={{width: '100%', marginBottom: '30px'}}/>
                </div>
            </form>
        </div>
    );
}

export default RegistrationFormThird;