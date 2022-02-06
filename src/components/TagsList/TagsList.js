import React from 'react'
import plusIcon from '../../assets/images/plus-icons/bx-plus-gray.svg'
import hashIcon from '../../assets/images/bx-hash.svg'
import './TagsList.scss';
import {useDispatch, useSelector} from "react-redux";
import {setActiveTag} from "../../features/tagsSlice";
import {selectActiveTag} from "../../features/tagsSlice";

function CategoriesList(props) {

    const dispatch = useDispatch()

    const allTagsNonActiveClassName = "tags__item tags__select-all-button"
    const allTagsActiveClassName = "tags__item tags__select-all-button tags__item--active"
    const nonActiveClassName = "tags__item"
    const activeItemClassName = "tags__item tags__item--active"

    const activeTag = useSelector(selectActiveTag);

    const handleActiveTag = (event) => {
        dispatch(setActiveTag(event.target.id))
    }

    return (
        <div className="tags">
            <div className="tags__header">
                <h3 className="tags__title">TAGS</h3>
                <img src={plusIcon} alt="add tag" className="tags__add-button"/>
            </div>
            <ul className="tags__list">
                <li className={activeTag === 'All' ? allTagsActiveClassName : allTagsNonActiveClassName} onClick={handleActiveTag} id="All">All</li>
                {
                    props.tags.map(item => {
                        return (
                            <li
                                key={item}
                                className={activeTag === item ? activeItemClassName : nonActiveClassName}
                                onClick={handleActiveTag}
                                id={item}
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