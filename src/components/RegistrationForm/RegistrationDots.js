import React from 'react';
import './RegistrationDots.scss';

function RegistrationDots(props) {
    return (
        <div className="form__dots-container">
            <div className="form__dot form__dot--filled"></div>
            <div className={`form__dot ${props.pageNumber == 2 || props.pageNumber == 3 ? "form__dot--filled" : "form__dot--empty"}`}></div>
            <div className={`form__dot ${props.pageNumber == 3 ? "form__dot--filled" : "form__dot--empty"}`}></div>
        </div>
    );
}

export default RegistrationDots;