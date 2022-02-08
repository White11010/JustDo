import * as React from 'react';
import './StartPage.scss';
import StartModal from "../../components/StartModal/StartModal";
import Header from "../../components/Header/Header";
import illustration from "../../assets/images/Illustration.svg";



function StartPageEllipse() {
    return (
        <div className="start__ellipse"/>
    );
}

function StartPageTitle() {
    return (
        <h1 className="start__title">
            <span className="start__title--blue">Be productive</span>
            <span><span className="start__title--blue"> with</span><span className="start__title--red"> JustDo</span></span>
        </h1>
    );
}

function StartPageIllustration() {
    return (
        <img className="start__illustration" src={illustration} alt="illustration"/>
    );
}

function StartPageBeginButton(props) {
    return (
        <button className="button button--primary start__begin-button" onClick={() => {props.handleOpen(); props.handleRegistration();}}>To begin</button>
    );
}

function StartPage() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [currentForm, setCurrentForm] = React.useState('registration');
    const handleRegistration = () => setCurrentForm('registration');
    const handleLogin = () => setCurrentForm('login');


    return (
        <div className="wrapper">
            <Header handleOpen={handleOpen} handleRegistration={handleRegistration} handleLogin={handleLogin}/>
            <div className="start">
                <div className="start__container">
                    <StartPageEllipse/>
                    <StartPageTitle/>
                    <StartPageBeginButton handleOpen={handleOpen} handleRegistration={handleRegistration}/>
                </div>
                <div className="start__image-container">
                    <StartPageIllustration/>
                </div>
                <StartModal open={open} handleClose={handleClose} currentForm={currentForm} handleRegistration={handleRegistration} handleLogin={handleLogin}/>
            </div>
        </div>
    );
}

export default StartPage;