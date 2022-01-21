import React from 'react';
import './Header.style.scss'
import HeaderLogo from "../../components/Header/HeaderLogo";
import HeaderNav from "../../components/Header/HeaderNav";
import HeaderButtons from "../../components/Header/HeaderButtons";

function Header(props) {
    return (
        <header className="header">
            <HeaderLogo/>
            <HeaderNav/>
            <HeaderButtons handleOpen={props.handleOpen} handleLogin={props.handleLogin} handleRegistration={props.handleRegistration}/>
        </header>
    );
}

export default Header;