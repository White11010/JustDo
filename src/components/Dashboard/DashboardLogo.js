import React from 'react';
import './DashboardLogo.scss';
import logo from '../../assets/images/logo-icon.svg';

function DashboardLogo(props) {
    return (
        <div className="dashboard__logo">
            <img src={logo} alt="logo"/>
            <h1 className="dashboard__logo-title">JustDo</h1>
        </div>
    );
}

export default DashboardLogo;