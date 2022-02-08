import React from 'react';
import './HeaderLogo.scss'
import logo from '../../assets/images/logo.svg';

function HeaderLogo(props) {
    return (
        <div className="header__logo">
            <img src={logo} alt="logo"/>
            <h2 className="header__title">JustDo</h2>
        </div>
    );
}

export default HeaderLogo;