import React from 'react';
import arrow from '../../assets/images/arrow.svg';
import './RegistrationFormBackButton.scss';

function RegistrationFormBackButton(props) {
    return (
        <div className="button form__back-button" onClick={props.handlePrevPage}>
            <img src={arrow} alt="arrow"/>
        </div>
    );
}

export default RegistrationFormBackButton;