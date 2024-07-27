import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import "./App.css"

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/upload" element={<FileUpload />} />
                        <Route path="/files" element={<FileList />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
