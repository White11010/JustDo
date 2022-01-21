import React from 'react';
import './StartPageTitle.scss';

function StartPageTitle(props) {
    return (
        <h1 className="start__title">
            <span className="start__title--blue">Be productive with</span>
            <span className="start__title--red"> JustDo</span>
        </h1>
    );
}

export default StartPageTitle;