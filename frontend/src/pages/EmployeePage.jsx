import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmployee, fetchSalary } from '../api';

export default function EmployeePage() {
  const { id } = useParams();
  const [emp, setEmp]       = useState(null);
  const [salary, setSalary] = useState(null);
  const [err, setErr]       = useState('');

  useEffect(() => {
    fetchEmployee(id)
      .then(setEmp)
      .catch(() => setErr('Couldn’t load employee'));
  }, [id]);

  const loadSalary = () => {
    fetchSalary(id)
      .then(r => setSalary(r.salary))
      .catch(() => setErr('Not authorized to view salary'));
  };

  if (err)       return <p>{err}</p>;
  if (!emp)      return <p>Loading…</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{emp.name}</h1>
      <p>Role: {emp.jobRole}</p>
      <p>Location: {emp.location}</p>
      <button onClick={loadSalary}>View Salary</button>
      {salary != null && <p>Salary: ${salary.toLocaleString()}</p>}
    </div>
  );
}
