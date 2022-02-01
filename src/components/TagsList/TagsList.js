import React from 'react'
import plusIcon from '../../assets/images/plus-icons/bx-plus-gray.svg'
import hashIcon from '../../assets/images/bx-hash.svg'
import './TagsList.scss';

function CategoriesList(props) {
    return (
        <div className="tags">
            <div className="tags__header">
                <h3 className="tags__title">TAGS</h3>
                <img src={plusIcon} alt="add tag" className="tags__add-button"/>
            </div>
            <ul className="tags__list">
                <li className="tags__item tags__select-all-button tags__item--active">All</li>
                {
                    props.tags.map(item => {
                        return (
                            <li
                                key={item}
                                className="tags__item"
                            >
                                <img src={hashIcon} alt="home"/>
                                <p className="tags__item-title">{item}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default CategoriesList;