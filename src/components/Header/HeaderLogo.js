import React from 'react';
import './HeaderLogo.scss'
import logo from '../../assets/images/logo.svg';

function HeaderLogo(props) {
    return (
        <>
            <img src={logo} alt="logo"/>
            <h2 className="header__title">JustDo</h2>
        </>
    );
}

export default HeaderLogo;