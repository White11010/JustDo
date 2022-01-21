import React from 'react';
import './LoginFormLink.scss';

function LoginFormLink(props) {
    return (
        <p className="registration__link">
            <span className="registration__link--gray">Don't have an account?</span>
            <span className="registration__link--blue" onClick={props.handleRegistration}> Check in</span>
        </p>
    );
}

export default LoginFormLink;