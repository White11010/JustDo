import React from 'react';
import './TaskTextarea.scss';

function TaskTextarea(props) {
    return (
        <div className="task-creation__textarea-container">
            <textarea name="description" id="description" className="task-creation__textarea" placeholder="Enter your text"/>
            <label htmlFor="description" className="task-creation__textarea-label">Description</label>
        </div>
    );
}

export default TaskTextarea;