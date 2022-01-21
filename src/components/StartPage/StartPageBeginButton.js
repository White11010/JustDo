import React from 'react';

import './StartPageBeginButton.scss';

function StartPageBeginButton(props) {
    return (
        <button className="button button--primary start__begin-button" onClick={() => {props.handleOpen(); props.handleRegistration();}}>To begin</button>
    );
}

export default StartPageBeginButton;