import React from 'react';
import './GroupsCreationForm.scss'
import FormInput from "../FormInputs/FormInput";
import closeIcon from '../../assets/images/bx-close.svg'
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addGroup} from "../../features/groupsSlice";
import API from '../../api'
import {setError} from "../../features/errorsSlice";

function GroupsCreationForm(props) {

    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm({mode: "onChange"});


    const onSubmit = (data) => {
        API.post(`/groups`, data)
            .then(response => {
                if (response.status === 201) {
                    dispatch(addGroup(response.data.data))
                    props.handleModalClose();
                }
            })
            .catch(() => {
                dispatch(setError(true))
            })
    }

    return (
        <div className="groups__creation-form">
            <img src={closeIcon} alt="close" className="modal__close-icon" onClick={props.handleModalClose}/>
            <h3 className="groups__creation-form-title">Group Creation</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    ref={register({required: true})}
                    name="name"
                    type="text"
                    label="Group Name"
                    placeholder="Enter group name"
                />
                <button type="submit" className="button button--primary groups__creation-form-button">Create group</button>
            </form>
        </div>
    );
}

export default GroupsCreationForm;