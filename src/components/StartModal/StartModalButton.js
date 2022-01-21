import React from 'react';
import './StartModalButton.scss';

function StartModalButton(props) {
    return (
        <button className="button button--primary form__button" onClick={props.handleNextPage} style={props.style}>Next</button>
    );
}

export default StartModalButton;