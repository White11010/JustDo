import React, {useEffect} from 'react';
import plusIcon from '../../assets/images/plus-icons/bx-plus-gray.svg'
import sportIcon from "../../assets/images/categories-icons/bx-color-workout.svg";
import homeIcon from "../../assets/images/categories-icons/bx-color-house.svg";
import workIcon from "../../assets/images/categories-icons/bx-color-work.svg";
import meetingsIcon from "../../assets/images/categories-icons/bx-color-meeting.svg";
import './CategoriesList.scss';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {selectCategories, setCategories} from "../../features/categoriesSlice";

const categoriesIconsMap = new Map([
    ['home', homeIcon],
    ['sport', sportIcon],
    ['work', workIcon],
    ['meetings', meetingsIcon]
])

const defaultCategories = [
    {
        name: 'Home',
        icon: 'home'
    },
    {
        name: 'Meetings',
        icon: 'meetings'
    },
    {
        name: 'Work',
        icon: 'work'
    },
    {
        name: 'Sport',
        icon: 'sport'
    },
]

function CategoriesList(props) {

    const dispatch = useDispatch();

    const sendDefaultCategories = (token, category) => {
        return axios({
            method: "post",
            url: "http://34.125.5.252:3000/api/categories",
            data: category,
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    }

    const getCategoriesFromApi = (token) => {
        return axios({
            method: "get",
            url: "http://34.125.5.252:3000/api/categories",
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
    }

    useEffect(() => {
        const token = localStorage.getItem('authorization');

        getCategoriesFromApi(token)
            .then(response => {
                if (response.data.length === 0) {
                    defaultCategories.forEach(category => {
                        sendDefaultCategories(token, category)
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                }
                dispatch(setCategories(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const categories = useSelector(selectCategories);


    return (
        <div className="categories">
            <div className="categories__header">
                <h3 className="categories__title">CATEGORY</h3>
                <img src={plusIcon} alt="add category" className="categories__add-button"/>
            </div>
            <ul className="categories__list">
                <li className="categories__item categories__select-all-button categories__item--active">All</li>
                {
                    categories !== null && categories.map(item => {
                        return (
                            <li
                                key={item.name}
                                className="categories__item"
                            >
                                <img src={categoriesIconsMap.get(item.icon)} alt="home"/>
                                <p className="categories__item-title">{item.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default CategoriesList;