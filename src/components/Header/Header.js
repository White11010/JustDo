import React from 'react';
import './Header.scss'
import burgerIcon from '../../assets/images/bx-menu-alt-left.svg'
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderButtons from "./HeaderButtons";
import {useMediaQuery} from 'react-responsive'

function Header(props) {

    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    const [menuOpen, setMenuOpen] = React.useState(false);
    const handleMenuOpen = () => setMenuOpen(true)
    const handleMenuClose = () => setMenuOpen(false)

    return (
        <header className="header">
            {
                isTablet ?
                    <>
                    <img src={burgerIcon} alt="open menu" onClick={handleMenuOpen}/>
                    {
                        menuOpen &&
                        <div className="header__mobile-menu-container">
                            <div className="header__mobile-menu">
                                <HeaderLogo/>
                                <HeaderNav/>
                                {
                                    isMobile &&
                                    <HeaderButtons
                                        handleOpen={props.handleOpen}
                                        handleLogin={props.handleLogin}
                                        handleRegistration={props.handleRegistration}
                                    />
                                }
                            </div>
                            <div className="header__mobile-menu-background" onClick={handleMenuClose}/>
                        </div>
                    }
                </>
                        :
                    <>
                        <HeaderLogo/>
                        <HeaderNav/>
                    </>
            }
            {
                !isMobile &&
                <HeaderButtons
                    handleOpen={props.handleOpen}
                    handleLogin={props.handleLogin}
                    handleRegistration={props.handleRegistration}
                />
            }
        </header>
    );
}

export default Header;