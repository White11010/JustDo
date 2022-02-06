import React, {useRef}  from 'react';
import './UserProfileFileUploader.scss'

const UserProfileFileUploader = ({onFileSelect}) => {

    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        onFileSelect(e.target.files[0])
    }

    return (
        <div className="user-modal__file-uploader">
            <input name="image" type="file" id="input__file" className="user-modal__file-uploader-input" onChange={handleFileInput}/>
            <label
                onClick={e => fileInput.current && fileInput.current.click()}
                htmlFor="input__file"
                className="button button--secondary user-modal__account-photo-button user-modal__file-uploader-button"
            >
                Change photo
            </label>
        </div>
    );
}


export default UserProfileFileUploader;