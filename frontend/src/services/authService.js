import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Register user
const register = async (username, password) => {
    const response = await axios.post(API_URL + 'register', { username, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (username, password) => {
    const response = await axios.post(API_URL + 'login', { username, password });
    if (response.data.token) {
        console.log('responce ',response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

// Get current user
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
