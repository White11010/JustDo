import React from 'react';
import './Groups.scss';
import arrowIcon from '../../assets/images/bx-chevron-down-big.svg';
import GroupsList from "../../components/Groups/GroupsList";
import {useSelector} from "react-redux";
import {selectGroups} from "../../features/groupsSlice";

function Groups(props) {

    const groups = useSelector(selectGroups)

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open)
        console.log('open')
    };

    const arrowDownClassName = "groups__arrow-icon groups__arrow-icon--down"
    const arrowUpClassName = "groups__arrow-icon groups__arrow-icon--up"

    return (
        <div className="groups">
            <div className="groups__header" onClick={handleOpen}>
                <h3 className="groups__title">My groups</h3>
                <img src={arrowIcon} alt="arrow" className={open ? arrowUpClassName : arrowDownClassName}/>
                {
                    open &&
                    <button className="button button--primary groups__add-button">Create group</button>
                }
            </div>
            {
                open &&
                <GroupsList groups={groups}/>
            }
        </div>
    );
}

export default Groups;