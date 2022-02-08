import React from 'react';
import './GroupsCreationForm.scss'
import FormInput from "../FormInputs/FormInput";
import closeIcon from '../../assets/images/bx-close.svg'
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addGroup} from "../../features/groupsSlice";

function GroupsCreationForm(props) {

    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm({mode: "onChange"});

    const sendGroupData = (data) => {
        const token = localStorage.getItem('authorization');

        return axios({
            method: "post",
            url: "http://34.125.5.252:3000/api/groups",
            headers: {'authorization': 'Bearer ' + token},
            data: data
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    }

    const onSubmit = (data) => {
        sendGroupData(data)
            .then(response => {
                if (response.status === 201) {
                    dispatch(addGroup(response.data.data))
                    props.handleModalClose();
                }
            })
            .catch(error => {
                console.log(error)
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