import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../config';
import './Admin.css';

function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`${API_BASE}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError('Galat password!');
            }
        } catch (err) {
            setError('Server se connect nahi ho paya.');
        }
    };

    return (
        <div className="admin-login">
            <form className="admin-login-form" onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="admin-error">{error}</p>}
            </form>
        </div>
    );
}

export default AdminLogin;