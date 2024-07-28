import React, { useState } from 'react';
import fileService from '../services/fileService';
// import { Navigate } from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await fileService.uploadFile(file);
            setMessage(`File uploaded successfully. Your code is ${response.code}`);
            // Navigate('/profile')
        } catch (error) {
            setMessage('Error uploading file');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleFileUpload}>
                <div className="form-group">
                    <input type="file" className="form-control" onChange={handleFileChange} required />
                </div>
                <button className="btn btn-primary btn-block">Upload</button>
                <a className='btn btn-primary' href="/profile">back to profile</a>
            </form>
            {message && (
                <div className="form-group">
                    <div className="alert alert-info" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
