import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';


const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authService.register(username, password);
            alert('user Register Successfull')
            navigate('/login')
            // props.history.push('/login');
        } catch (error) {
            setMessage(error.response.data.msg);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </form>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
