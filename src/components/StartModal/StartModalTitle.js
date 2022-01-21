import React from 'react';
import './StartModalTitle.scss';

function StartModalTitle(props) {
    return (
        <h3 className="form__title">{ props.title }</h3>
    );
}

export default StartModalTitle;