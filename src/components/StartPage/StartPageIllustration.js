import React from 'react';
import illustration from '../../assets/images/Illustration.svg';

import './StartPageIllustrarion.scss'

function StartPageIllustration(props) {
    return (
        <img className="start__illustration" src={illustration} alt="illustration"/>
    );
}

export default StartPageIllustration;