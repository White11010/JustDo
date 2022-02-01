import React, {forwardRef} from 'react';
import './FormInput.scss';

const FormInput = React.forwardRef(
    ({name, type, label, placeholder, style, isError, errorText, ...restProps}, forwardRef) => {
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
                {
                    isError && <span
                        className="form-validation-error-message"
                    >
                        {errorText}
                    </span>
                }
            </p>
        )
    }
)


export default FormInput;