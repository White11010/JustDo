import React from 'react';
import './RegistrationFormLink.scss';

function RegistrationFormLink(props) {
    return (
        <p className="registration__link">
            <span className="registration__link--gray">Already a member?</span>
            <span className="registration__link--blue" onClick={props.handleLogin}> Log in</span>
        </p>
    );
}

export default RegistrationFormLink;