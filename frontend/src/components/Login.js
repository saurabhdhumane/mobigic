import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const Navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login(username, password);
            console.log('data', data);
            Navigate('/profile')
            // props.history.push('/profile');
            window.location.reload();
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.msg
                ? error.response.data.msg
                : 'Login failed. Please check your credentials and try again.';
            setMessage(message);
        }
    };


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <form onSubmit={handleLogin}>
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
                        <button className="btn btn-primary btn-block">Login</button>
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

export default Login;
