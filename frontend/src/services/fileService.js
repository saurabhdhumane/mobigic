import axios from 'axios';

const API_URL = 'http://localhost:5000/api/files/';

// Upload file
const uploadFile = async (file) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(API_URL + 'upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`,
        },
    });

    return response.data;
};

// Get files
const getFiles = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(API_URL, {
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    return response.data;
};

// Delete file
const deleteFile = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.delete(`${API_URL}:?filename=${id}`, {
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    return response.data;
};

// Download file
const downloadFile = async (filename, code) => {
    return axios.post(API_URL + `download/:?filename=${filename}`, { code }, {
        responseType: 'blob' // Important for handling binary data
    });
};

export default {
    uploadFile,
    getFiles,
    deleteFile,
    downloadFile,
};
