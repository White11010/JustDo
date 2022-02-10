import axios from 'axios';

const token = localStorage.getItem('authorization')

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {'authorization': 'Bearer ' + token},
});