import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUser(authService.getCurrentUser());
    }, []);

    return (
        <div className="container">
            {currentUser ? (
                <div>
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                    {/* <p>
                        <strong>Token:</strong> {currentUser.token}
                    </p> */}
                    <a href="/upload">Upload File</a> | <a href="/files">View Files</a>
                </div>
            ) : (
                <div>
                    <h3>No user data available</h3>
                </div>
            )}
        </div>
    );
};

export default Profile;
