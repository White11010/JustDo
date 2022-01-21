import * as React from 'react';
import './StartPage.scss';
import StartPageTitle from "../../components/StartPage/StartPageTitle";
import StartPageIllustration from "../../components/StartPage/StartPageIllustration";
import StartPageBeginButton from "../../components/StartPage/StartPageBeginButton";
import StartPageEllipse from "../../components/StartPage/StartPageEllipse";
import StartModal from "../../components/StartModal/StartModal";
import Header from "../Header/Header";

function StartPage(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [currentForm, setCurrentForm] = React.useState('registration');
    const handleRegistration = () => setCurrentForm('registration');
    const handleLogin = () => setCurrentForm('login');


    return (
        <>
            <Header handleOpen={handleOpen} handleRegistration={handleRegistration} handleLogin={handleLogin}/>
            <div className="start">
                <div className="start__container">
                    <StartPageEllipse/>
                    <StartPageTitle/>
                    <StartPageBeginButton handleOpen={handleOpen} handleRegistration={handleRegistration}/>
                </div>
                <StartPageIllustration/>
                <StartModal open={open} handleClose={handleClose} currentForm={currentForm} handleRegistration={handleRegistration} handleLogin={handleLogin}/>
            </div>
        </>
    );
}

export default StartPage;