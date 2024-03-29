import React, {useEffect, useRef} from 'react';
import './CategoriesList.scss';
import {useForm} from "react-hook-form";
import plusIcon from '../../assets/images/plus-icons/bx-plus-gray.svg'
import sportIcon from "../../assets/images/categories-icons/bx-color-workout.svg";
import homeIcon from "../../assets/images/categories-icons/bx-color-house.svg";
import workIcon from "../../assets/images/categories-icons/bx-color-work.svg";
import meetingsIcon from "../../assets/images/categories-icons/bx-color-meeting.svg";
import imagePlaceholderIcon from "../../assets/images/bxs-image-alt.svg"
import editIcon from "../../assets/images/bx-edit-alt.svg"
import trashIcon from "../../assets/images/bx-trash.svg"
import {useDispatch, useSelector} from "react-redux";
import {
    addCategory,
    selectActiveCategory,
    selectCategories, setActiveCategory,
    updateCategory
} from "../../features/categoriesSlice";
import {deleteCategory} from "../../features/categoriesSlice";
import API from '../../api'
import {setError} from "../../features/errorsSlice";

const categoriesIconsMap = {
    home: homeIcon,
    sport: sportIcon,
    work: workIcon,
    meetings: meetingsIcon
}


function CategoriesList() {
    const {register, handleSubmit, watch, errors, formState} = useForm({mode: "onChange"});


    const input = useRef(null)

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [openIcons, setOpenIcons] = React.useState(false)
    const handleIconsOpen = () => setOpenIcons(true)
    const handleIconsClose = () => setOpenIcons(false)

    const [categoryName, setCategoryName] = React.useState('')
    const handleCategoryName = (name) => setCategoryName(name);

    const [categoryIcon, setCategoryIcon] = React.useState(null)
    const handleCategoryIcon = (icon) => setCategoryIcon(icon);

    const [categoriesHovered, setCategoriesHovered] = React.useState({})
    const handleSetCategoriesHovered = (category) => setCategoriesHovered(Object.assign(categoriesHovered, category))
    const handleCategoryHovered = (event) => {
        if (!categoriesUpdating[event.target.closest(".categories__item").attributes.id.value]) {
            setCategoriesHovered({...categoriesHovered, ...{[event.target.closest(".categories__item").attributes.id.value]: true}});
        }
    }
    const handleCategoryLeaved = (event) => {
        if (event.type === "mouseout" && (event.relatedTarget.attributes.id === undefined || event.target.attributes.id.value !== event.relatedTarget.attributes.id.value)) {
            setCategoriesHovered({...categoriesHovered, ...{[event.target.closest(".categories__item").attributes.id.value]: false}});
        }
    }

    const [categoriesUpdating, setCategoriesUpdating] = React.useState({})
    const handleSetCategoriesUpdating = (category) => setCategoriesUpdating(Object.assign(categoriesUpdating, category))
    const handleCategoryUpdating = (event) => {
        setCategoriesUpdating({...categoriesUpdating, ...{[event.target.closest(".categories__item").attributes.id.value]: true}});
    }
    const handleCategoryUpdated = (event) => {
        setCategoriesUpdating({...categoriesUpdating, ...{[event.target.closest(".categories__item").attributes.id.value]: false}});
    }


    const handleAddCategory = () => {
        handleOpen();
    }

    const selectIcon = (event) => {
        handleCategoryIcon(event.target.attributes.category.value);
        handleIconsClose()
        input.current.focus();
    }

    const onSubmit = (event) => {
        if (event.code === 'Enter' || event.type === 'blur' && (!event.relatedTarget || event.relatedTarget.attributes.id.value !== 'select=category-icon')) {
            handleClose()
            if (categoryName !== '') {
                const data = {}
                data.name = categoryName;
                data.icon = categoryIcon;

                API.post(`/categories`, data)
                    .then(response => {
                        if (response.status === 201) {
                            dispatch(addCategory(response.data.data))
                            handleCategoryName('')
                            handleCategoryIcon(null)
                        }
                    })
                    .catch(() => {
                        dispatch(setError(true))
                    })
            }
        }
    }

    const handleOpenUpdateInput = (event) => {
        handleCategoryUpdating(event);
        handleCategoryLeaved(event)
    }

    const onUpdateSubmit = (event) => {
        if (event.code === 'Enter' || event.type === 'blur') {
            handleCategoryUpdated(event);
            if (event.target.value !== '') {
                const data = {}
                data.name = event.target.value;
                data.id = event.target.closest(".categories__item").attributes.id.value;
                API.put(`/categories`, data)
                    .then(response => {
                        if (response.status === 200) {
                            dispatch(updateCategory(response.data.data))
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        dispatch(setError(true))
                    })
            }
        }
    }

    const handleDeleteCategory = (event) => {
        const data = {}
        data.id = event.target.attributes.id.value
        API.delete(`/categories`, {data})
            .then(response => {
                if (response.status === 200) {
                    dispatch(deleteCategory(event.target.attributes.id.value))
                    dispatch(setActiveCategory('All'))
                }
            })
            .catch(() => {
                dispatch(setError(true))
            })


    }

    useEffect(() => {
        open && input.current.focus();
    }, [open])

    const dispatch = useDispatch();

    const categories = useSelector(selectCategories);

    useEffect(() => {
        if (categories !== null)
            categories.forEach(category => {
                handleSetCategoriesHovered({[category.id]: false})
                handleSetCategoriesUpdating({[category.id]: false})
            })
    }, [categories])

    const allCategoriesNonActiveClassName = "categories__item categories__select-all-button"
    const allCategoriesActiveClassName = "categories__item categories__select-all-button categories__item--active"
    const nonActiveClassName = "categories__item"
    const activeItemClassName = "categories__item categories__item--active"

    const activeCategory = useSelector(selectActiveCategory);
    const handleActiveCategory = (event) => {
        dispatch(setActiveCategory(event.target.id))
    }

    return (
        <div className="categories">
            <div className="categories__header">
                <h3 className="categories__title">CATEGORY</h3>
                <img src={plusIcon} alt="add category" className="categories__add-button" onClick={handleAddCategory}/>
            </div>
            <ul className="categories__list">
                <li className={activeCategory === 'All' ? allCategoriesActiveClassName : allCategoriesNonActiveClassName}
                    onClick={handleActiveCategory} id="All">All
                </li>
                {
                    categories !== null && categories.map(item => {
                        return (
                            <li
                                key={item.name}
                                id={item.id}
                                className={activeCategory == item.id ? activeItemClassName : nonActiveClassName}
                                onMouseOver={handleCategoryHovered}
                                onMouseOut={handleCategoryLeaved}
                                onClick={handleActiveCategory}
                            >
                                {
                                    item.icon !== null ?
                                    <img
                                        src={categoriesIconsMap[item.icon]}
                                        alt={categoriesIconsMap[item.icon]}
                                        className="categories__icon"
                                        id={item.id}
                                    /> :
                                        <img src={imagePlaceholderIcon} alt="select image"  className="categories__icon" id={item.id}/>

                                }
                                {
                                    categoriesUpdating[item.id] ?
                                        <input
                                            className="categories__item-input"
                                            type="text"
                                            defaultValue={item.name}
                                            onKeyPress={onUpdateSubmit}
                                            onBlur={onUpdateSubmit}
                                            id={item.id}
                                        /> :
                                        <p className="categories__item-title" id={item.id}>{item.name}</p>
                                }
                                {
                                    categoriesHovered[item.id] &&
                                    <div className="categories__item-actions" id={item.id}>
                                        <img src={editIcon} alt="edit category" onClick={handleOpenUpdateInput}
                                             id={item.id}/>
                                        <img src={trashIcon} alt="delete category" onClick={handleDeleteCategory}
                                             id={item.id}/>
                                    </div>
                                }
                            </li>
                        )
                    })
                }
                {
                    open &&
                    <li
                        className="categories__item categories__input"
                    >
                        <img
                            tabIndex="0"
                            id="select=category-icon"
                            src={categoryIcon === null ? imagePlaceholderIcon : categoriesIconsMap[categoryIcon]}
                            alt="category image"
                            onClick={handleIconsOpen}
                            className="categories__icon"
                        />
                        <input
                            ref={input}
                            type="text"
                            className="categories__item-title"
                            onChange={event => handleCategoryName(event.target.value)}
                            onKeyPress={onSubmit}
                            onBlur={onSubmit}
                        />
                        {
                            openIcons && <ul className="categories__icons-list">
                                {
                                    Object.keys(categoriesIconsMap).map(category => {
                                        return (
                                            <li
                                                key={category}
                                                className="categories__icons-list-item"
                                            >
                                                <img
                                                    src={categoriesIconsMap[category]}
                                                    alt={categoriesIconsMap[category]}
                                                    category={category}
                                                    onClick={selectIcon}
                                                    className="categories__icon"
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </li>
                }
            </ul>
        </div>
    );
}

export default CategoriesList;