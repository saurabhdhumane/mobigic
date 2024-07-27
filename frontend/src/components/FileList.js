import React, { useState, useEffect } from 'react';
import fileService from '../services/fileService';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [code, setCode] = useState('');
    const [downloadId, setDownloadId] = useState(null);
    const [message, setMessage] = useState('');
    const [FileName,setFileName]=useState([]);
    console.log('FIleName' ,FileName);
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fileService.getFiles();
                setFiles(response);
            } catch (error) {
                setMessage('Error fetching files');
            }
        };
        fetchFiles();
    }, []);

    const handleDelete = async (FileName) => {
        try {
            await fileService.deleteFile(FileName);
            setFiles(files.filter(file => file.FileName !== FileName));
        } catch (error) {
            setMessage('Error deleting file');
        }
    };

    const setFileNamefn=(FileName)=>{
        setFileName(FileName)
    }

    const handleDownload = async (e) => {
        e.preventDefault();
        console.log('FileName ', FileName);
        try {
            const response = await fileService.downloadFile(FileName, code);
    
            // Create a URL for the file and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', FileName); // Use the filename or set as needed
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url); // Clean up URL object
        } catch (error) {
            setMessage('Error downloading file');
        }
    };

    return (
        <div className="container">
            <h3>Uploaded Files</h3>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
            <ul className="list-group">
                {files.map(file => (
                    <li key={file._id} className="list-group-item">
                        {file.filename}
                        <button className="btn btn-danger btn-sm float-right" onClick={() => handleDelete(file.filename)}>Delete</button>
                        <button className="btn btn-primary btn-sm float-right mr-2" onClick={() =>setFileNamefn(file.filename)}>Download</button>
                    </li>
                ))}
            </ul>
            {FileName && (
                <form onSubmit={(e) => { e.preventDefault(); handleDownload(downloadId); }}>
                    <div className="form-group">
                        <label htmlFor="code">Enter Download Code</label>
                        <input type="text" className="form-control" name="code" value={code} onChange={(e) => setCode(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={(e)=>{handleDownload(e)}}>Download</button>
                </form>
            )}
        </div>
    );
};

export default FileList;
