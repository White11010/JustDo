import React, {forwardRef} from 'react';
import {useForm} from "react-hook-form";
import './FormInput.scss';

const FormInput = React.forwardRef(
    ({name, type, label, placeholder, style, ...restProps}, forwardRef) => {
        return (
            <p className="form__input-container" style={style}>
                <label
                    htmlFor={name}
                    className="form__label"
                >
                    {label}
                </label>
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    ref={forwardRef}
                    className="form__input"
                />
            </p>
        )
    }
)

// function FormInput(props) {
//     const { register, handleSubmit, watch, errors, formState } = useForm({ mode: "onChange" });
//
//     return (
//         <p className="form__input-container" style={props.style}>
//             <label
//                 htmlFor={props.name}
//                 className="form__label"
//             >
//                 {props.label}
//             </label>
//             <input
//                 id={props.name}
//                 name={props.name}
//                 type={props.type}
//                 placeholder={props.placeholder}
//                 ref={props.ref}
//                 className="form__input"
//             />
//         </p>
//     );
// }

export default FormInput;