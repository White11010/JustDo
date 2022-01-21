import React from 'react';
import './RegistrationAgreement.scss';

function RegistrationAgreement() {
    return (
        <p className="registration__agreement">
            <span className="registration__agreement--gray">Continuing with Email, you agree to the </span>
            <span className="registration__agreement--blue">Terms of Use </span>
            <span className="registration__agreement--gray">and </span>
            <span className="registration__agreement--blue">Privacy Policy.</span>
        </p>
    );
}

export default RegistrationAgreement;