import React from 'react';
import './HeaderNav.scss';

function HeaderNav(props) {
    return (
        <nav className="header__nav">
            <ul className="header__list">
                <li className="header__item">Opportunities</li>
                <li className="header__item">Templates</li>
                <li className="header__item">For teams</li>
                <li className="header__item">Resources</li>
            </ul>
        </nav>
    );
}

export default HeaderNav;