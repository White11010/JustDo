import React, {useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import unloadPic from '../../assets/images/pic-upload.png';

import './FileUploader.scss'

function FileUploader(props) {
    const onDrop = useCallback(acceptedFiles => {
        props.handleAddImage(acceptedFiles);
    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({onDrop});

    return (
            <div {...getRootProps({ className: 'dropzone', multiple: false })}>
                <input {...getInputProps()} />
                <img src={unloadPic} alt="unload file"/>
                <p className="dropzone__title"><span>Drop your image here, or </span><span className="dropzone__title--blue">browse</span></p>
                <p className="dropzone__info"><span>Supports: PNG, JPG, SVG</span><span className="dropzone__dot"></span><span>Max size: 512x512 px</span></p>
                <p className="dropzone__prompt">Upload photo</p>
            </div>
    );
}

export default FileUploader;