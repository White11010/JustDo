import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.scss';
import StartPage from "./containers/StartPage/StartPage";
import Dashboard from "./containers/Dashboard/Dashboard";
import {useNavigate} from "react-router";
import axios from "axios";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {useDispatch} from "react-redux";
import {setAuth} from "./features/userSlice";
import AuthGuard from "./services/AuthGuard";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const getUserData = (token) => {
        return axios({
            method: "get",
            url: "http://34.125.5.252:3000/api/users",
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    };

    useEffect(() => {
        document.title = 'JustDo'

        const token = localStorage.getItem('authorization');
        if (token) {
            getUserData(token)
                .then(response => {
                    if (response.status === 200) {
                        dispatch(setAuth(true))
                        navigate('/dashboard')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

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
