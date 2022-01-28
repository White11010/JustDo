import React from 'react';
import plusIcon from '../../assets/images/plus-icons/bx-plus-gray.svg'
import './CategoriesList.scss';

function CategoriesList(props) {
    return (
        <div className="categories">
            <div className="categories__header">
                <h3 className="categories__title">CATEGORY</h3>
                <img src={plusIcon} alt="add category" className="categories__add-button"/>
            </div>
            <ul className="categories__list">
                <li className="categories__item categories__select-all-button categories__item--active">All</li>
                {
                    props.categories.map(item => {
                        return (
                            <li
                                key={item.name}
                                className="categories__item"
                            >
                                <img src={item.iconPath} alt="home"/>
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