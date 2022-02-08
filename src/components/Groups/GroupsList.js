import React from 'react';
import GroupsItem from "./GroupsItem";
import './GroupsList.scss';

function GroupsList(props) {
    return (
        <ul className="groups__list">
            {
                props.groups.map(group => {
                    return (
                        <GroupsItem
                            key={group.id}
                            id={group.id}
                            title={group.name}
                        />
                    )
                })
            }
        </ul>
    );
}

export default GroupsList;