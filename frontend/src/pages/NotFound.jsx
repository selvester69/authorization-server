import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
    );
}

export default NotFound;
