import React from 'react';
import './HeaderButtons.scss';

function HeaderButtons(props) {
    return (
        <div className="header__buttons-container">
            <button className="button button--secondary header__button" onClick={() => {props.handleOpen(); props.handleRegistration();}}>Registration</button>
            <button className="button button--primary header__button" onClick={() => {props.handleOpen(); props.handleLogin();}}>Log in</button>
        </div>
    );
}

export default HeaderButtons;