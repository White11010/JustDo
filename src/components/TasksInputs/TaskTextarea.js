import React, {forwardRef} from 'react';
import './TaskTextarea.scss';

const TaskTextarea = React.forwardRef(
    ({name, label, placeholder, value}, forwardRef) => {
        return (
            <div className="task-creation__textarea-container">
                <textarea name={name}
                          id={name}
                          className="task-creation__textarea"
                          placeholder={placeholder}
                          ref={forwardRef}
                          defaultValue={value}
                />
                <label htmlFor={name}  className="task-creation__textarea-label">{label}</label>
            </div>
        )
    })

export default TaskTextarea;