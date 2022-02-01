import React, {forwardRef} from 'react';
import './TaskTextarea.scss';

const TaskTextarea = React.forwardRef(
    ({name, label, placeholder}, forwardRef) => {
        return (
            <div className="task-creation__textarea-container">
                <textarea name={name}
                          id={name}
                          className="task-creation__textarea"
                          placeholder={placeholder}
                          ref={forwardRef}
                />
                <label htmlFor={name}  className="task-creation__textarea-label">{label}</label>
            </div>
        )
    })

// function TaskTextarea(props) {
//     return (
//         <div className="task-creation__textarea-container">
//             <textarea name="description" id="description" className="task-creation__textarea" placeholder="Enter your text"/>
//             <label htmlFor="description" className="task-creation__textarea-label">Description</label>
//         </div>
//     );
// }
//
export default TaskTextarea;