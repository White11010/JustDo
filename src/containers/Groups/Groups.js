import React, {useEffect} from 'react';
import './Groups.scss';
import arrowIcon from '../../assets/images/bx-chevron-down-big.svg';
import GroupsList from "../../components/Groups/GroupsList";
import {useDispatch, useSelector} from "react-redux";
import {selectGroups} from "../../features/groupsSlice";
import {setGroups} from "../../features/groupsSlice";
import axios from "axios";
import GroupsCreationModal from "../../components/Groups/GroupsCreationModal";

function Groups() {

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authorization');
        getGroupsFromApi(token)
            .then(response => {
                dispatch(setGroups(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const getGroupsFromApi = (token) => {
        return axios({
            method: "get",
            url: "http://34.125.5.252:3000/api/groups",
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    }

    const groups = useSelector(selectGroups)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(!open)
    };

    const [modalOpen, setModalOpen] = React.useState(false)
    const handleModalOpen = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false)


    const arrowDownClassName = "groups__arrow-icon groups__arrow-icon--down"
    const arrowUpClassName = "groups__arrow-icon groups__arrow-icon--up"

    return (
        <div className="groups">
            <div className="groups__header">
                <h3 className="groups__title" onClick={handleOpen}>My groups</h3>
                <img src={arrowIcon} alt="arrow" className={open ? arrowUpClassName : arrowDownClassName} onClick={handleOpen}/>
                {
                    open &&
                    <button className="button button--primary groups__add-button" onClick={handleModalOpen}>Create group</button>
                }
            </div>
            {
                open &&
                <GroupsList groups={groups}/>
            }
            {
                !open &&
                <div className="groups__bottom-line"/>
            }
            {
                modalOpen &&
                <GroupsCreationModal
                    open={modalOpen}
                    handleModalClose={handleModalClose}
                />
            }
        </div>
    );
}

export default Groups;