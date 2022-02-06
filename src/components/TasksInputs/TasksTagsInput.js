import React, {useEffect, useRef} from 'react';
import './FormSelectInput.scss'
import './TaskTagsInput.scss'
import plusIcon from '../../assets/images/bx-plus-circle.svg'
import xIcon from '../../assets/images/bx-x.svg'

function TasksTagsInput(props) {

    const input = useRef(null)

    const [inputOpen, setInputOpen] = React.useState(false)
    const handleInputOpen = () => setInputOpen(true)
    const handleInputClose = (event) => {
        if (event.code === 'Enter' && input.current.value !== '') {
            if (tagsList.length === 0) {
                handleAddTag(input.current.value)
            } else if (!tagsList.includes(input.current.value)) {
                handleAddTag(input.current.value)
            }
            setInputOpen(false)
        }
    }

    useEffect(() => {
        if (inputOpen) {
            input.current.focus();
        }
    }, [inputOpen])


    const [tagsList, setTagsList] = React.useState([])
    const handleAddTag = (tagData) => setTagsList(currentList => [...currentList, tagData]);
    const handleDeleteTag = (event) => {
        setTagsList(currentList => currentList.filter(tag => tag !== event.target.id))
    };

    useEffect(() => {
        let tags = tagsList.length === 0 ? null : tagsList.join(' ')
        props.handleTaskData({[props.keyWord]: tags});
    }, [tagsList])


    return (
        <div className="select" style={props.style}>
            <p className="select__label">Add tags</p>
            <div className="tags-input">
                {
                    inputOpen ?
                        <input
                            ref={input}
                            type="text"
                            className="tags-input__input"
                            onKeyPress={handleInputClose}
                        /> :
                        <ul className="tags-input__list">
                            {
                                tagsList.length !== 0 && tagsList.map(tag => {
                                    return (
                                        <li className="tags-input__tag" key={tag}>
                                            <p className="tags-input__name">
                                                {tag}
                                            </p>
                                            <img
                                                src={xIcon}
                                                alt="delete tag"
                                                className="tags-input__delete-icon"
                                                id={tag} onClick={handleDeleteTag}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                }
                <img src={plusIcon} alt="add tag" className="tags-input__add-button" onClick={handleInputOpen}/>
            </div>
        </div>
    );
}

export default TasksTagsInput;