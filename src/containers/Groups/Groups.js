import React, {useEffect} from 'react';
import './Groups.scss';
import arrowIcon from '../../assets/images/bx-chevron-down-big.svg';
import plusIcon from '../../assets/images/bx-plus.svg'
import GroupsList from "../../components/Groups/GroupsList";
import {useDispatch, useSelector} from "react-redux";
import {selectGroups} from "../../features/groupsSlice";
import {setGroups} from "../../features/groupsSlice";
import axios from "axios";
import GroupsCreationModal from "../../components/Groups/GroupsCreationModal";
import {useMediaQuery} from "react-responsive";
import API from '../../api'
import {setError} from "../../features/errorsSlice";

function Groups() {

    const dispatch = useDispatch();

    useEffect(() => {
        API.get(`/groups`)
            .then(response => {
                dispatch(setGroups(response.data))
            })
            .catch(() => {
                dispatch(setError(true))
            })

        const token = localStorage.getItem('authorization');
    }, [])


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

    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})

    return (
        <div className="groups">
            {
                !isTablet &&
                <div className="groups__header">
                    <h3 className="groups__title" onClick={handleOpen}>My groups</h3>
                    <img src={arrowIcon} alt="arrow" className={open ? arrowUpClassName : arrowDownClassName} onClick={handleOpen}/>
                    {
                        open &&
                        <button
                            className="button button--primary groups__add-button"
                            onClick={handleModalOpen}
                        >
                            Create group
                            <img src={plusIcon} alt="plus"/>
                        </button>
                    }
                </div>
            }
            {
                open &&
                <GroupsList groups={groups}/>
            }
            {
                !open && !isTablet &&
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