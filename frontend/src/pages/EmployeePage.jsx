import React, { useState, useEffect } from 'react';
import { useParams }               from 'react-router-dom';
import { fetchEmployee, fetchSalary } from '../api';

export default function EmployeePage() {
  const { id } = useParams();
  const [emp, setEmp]       = useState(null);
  const [salary, setSalary] = useState(null);
  const [error, setError]   = useState('');

  useEffect(() => {
    if (!id) return;
    fetchEmployee(id)
      .then(setEmp)
      .catch(() => setError('Could not load employee'));
  }, [id]);

  const loadSalary = () => {
    if (!id) return;
    fetchSalary(id)
      .then(r => setSalary(r.salary))
      .catch(() => setError('Not authorized to view salary'));
  };

  if (error)   return <p>{error}</p>;
  if (!emp)    return <p>Loading…</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{emp.firstname} {emp.lastname}</h1>
      <p>Role: {emp.jobTitle}</p>
      <p>Location: {emp.location}</p>
      <button onClick={loadSalary}>View Salary</button>
      {salary != null && <p>Salary: ${salary.toLocaleString()}</p>}
    </div>
  );
}
