import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            {/* <Link to="/upload" className="navbar-brand">File Upload</Link> */}
            <div className="navbar-nav ml-auto">
                {user ? (
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">
                            {user.username}
                        </Link>
                    </li>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </>
                )}
                {user && (
                    <li className="nav-item">
                        <a href="/" className="nav-link" onClick={handleLogout}>Logout</a>
                    </li>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
