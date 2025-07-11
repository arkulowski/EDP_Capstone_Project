import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable fetch wrapper
function apiFetch(url, options = {}) {
  const employeeId = localStorage.getItem('employeeId');
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'x-employee-id': employeeId,
    },
  });
}

export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!employeeId || !password) {
      setMessage('Please enter both Employee ID and password.');
      return;
    }

    localStorage.setItem('employeeId', employeeId);

    try {
      const response = await apiFetch('/', { method: 'GET' });

      if (response.ok || response.status === 404) {
        setMessage(`Login successful.`);
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        setMessage('Login failed or unauthorized.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during login.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('employeeId');
    setEmployeeId('');
    setPassword('');
    setMessage('Logged out successfully.');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Employee Login</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Employee ID:
          <input
            type="text"
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </label>
      </div>
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}>
        Login
      </button>
      <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
        Logout
      </button>
      {message && (
        <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>
      )}
    </div>
  );
}
