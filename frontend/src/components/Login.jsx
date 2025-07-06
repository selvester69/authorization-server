import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setToken('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            setMessage(response.data.message);
            setToken(response.data.token);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="App">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            {token && (
                <div style={{ marginTop: '20px', wordBreak: 'break-all' }}>
                    <strong>Token:</strong>
                    <div style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>{token}</div>
                </div>
            )}
        </div>
    );
}

export default Login;
