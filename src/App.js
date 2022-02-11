import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.scss';
import StartPage from "./containers/StartPage/StartPage";
import Dashboard from "./containers/Dashboard/Dashboard";
import {useNavigate} from "react-router";
import axios from "axios";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, setAuth} from "./features/userSlice";
import AuthGuard from "./services/AuthGuard";
import API from './api'

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        document.title = 'JustDo'

        const token = localStorage.getItem('authorization');
        if (token) {
            API.get(`users`)
                .then(response => {
                    if (response.status === 200) {
                        dispatch(setAuth(true))
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

    useEffect(() => {
        if (isAuth) {
            navigate('/dashboard')
        }
    }, [isAuth])

    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Routes>
                    <Route path="/" element={<StartPage/>}/>
                    <Route path="/dashboard" element={<AuthGuard><Dashboard/></AuthGuard>}/>
                </Routes>
            </LocalizationProvider>
        </div>
    );
}

export default App;
