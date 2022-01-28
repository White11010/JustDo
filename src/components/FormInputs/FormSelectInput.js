import React, {forwardRef, useRef, useEffect} from 'react';
import arrowIcon from '../../assets/images/bx-chevron-down-big.svg';
import './FormSelectInput.scss';

function FormSelectInput(props) {
    const [open, setOpen] = React.useState(false)
    const handleToggleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const rootEl = useRef(null);

    useEffect(() => {
        const onClick = e => rootEl.current.contains(e.target) || handleClose();
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);





    const [placeholder, setPlaceholder] = React.useState(props.options[0].name)
    const handlePlaceholder = (text) => setPlaceholder(text)

    const [icon, setIcon] = React.useState(props.options[0].icon)
    const handleIcon = (icon) => setIcon(icon)


    const selectOption = (event) => {
        handlePlaceholder(event.target.textContent);
        handleIcon(event.target.firstChild.getAttribute("src"));
        // props.handleTaskData({[props.key]: event.target.textContent})
        handleClose();
    }

    return (
        <div className="select" ref={rootEl} style={props.style}>
            <div className="select__trigger" onClick={handleToggleOpen}>
                <p className="select__label">{props.label}</p>
                {
                    icon != null &&
                    <img src={icon} alt="img" className="select__icon"/>
                }
                <p className="select__placeholder">{placeholder}</p>
                <img src={arrowIcon} alt="show options" className="select__arrow"/>
            </div>
            { open &&
                <ul className="select__options">
                    {
                        props.options.map(option => {
                            return(
                                <li key={option.name} className="select__option" onClick={selectOption}>
                                    {
                                        option.icon != null &&
                                        <img src={option.icon} alt="img" className="select__icon"/>
                                    }
                                    <p>{option.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}


export default FormSelectInput;