// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable fetch wrapper that always includes the stored employee ID
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
  const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeId') || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // On mount, if ID + stored name exist, set userName so we can show the greeting
  useEffect(() => {
    const storedName = localStorage.getItem('employeeName');
    if (employeeId && storedName) {
      try {
        const { firstname, lastname } = JSON.parse(storedName);
        setUserName(`${firstname} ${lastname}`);
      } catch {
        // ignore parse errors
      }
    }
  }, [employeeId]);

  const handleLogin = async () => {
    if (!employeeId || !password) {
      setMessage('Please enter both Employee ID and password.');
      return;
    }

    // Store the ID for subsequent requests
    localStorage.setItem('employeeId', employeeId);

    try {
      // Optional: your actual auth endpoint here
      const response = await apiFetch('/', { method: 'GET' });

      if (response.ok || response.status === 404) {
        // Fetch profile for the greeting
        const userRes = await fetch(
          `${import.meta.env.VITE_SOCKS_API_URL}/employees/${employeeId}`,
          { headers: { 'x-employee-id': employeeId } }
        );
        if (!userRes.ok) throw new Error('Failed to load profile');
        const user = await userRes.json();

        // Save their name and update state
        localStorage.setItem(
          'employeeName',
          JSON.stringify({ firstname: user.firstname, lastname: user.lastname })
        );
        setUserName(user.firstname + (user.lastname ? ` ${user.lastname}` : ''));
        setMessage(`Welcome, ${user.firstname}!`);
        // small delay so they see the message
        setTimeout(() => navigate('/'), 500);
      } else {
        setMessage('Login failed or unauthorized.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred during login.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('employeeId');
    localStorage.removeItem('employeeName');
    setEmployeeId('');
    setPassword('');
    setUserName('');
    setMessage('Logged out successfully.');
  };

  // If already logged in, show only the greeting + logout
  if (employeeId && userName) {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Welcome, {userName}!</h1>
        <p>You’re already logged in.</p>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
          Logout
        </button>
        {message && (
          <p style={{ marginTop: '1rem', color: 'green' }}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Otherwise render the login form
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

      <button
        onClick={handleLogin}
        style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}
      >
        Login
      </button>

      {message && (
        <p
          style={{
            marginTop: '1rem',
            color:
              message.startsWith('Welcome') ||
              message.toLowerCase().includes('success')
                ? 'green'
                : 'red',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}


