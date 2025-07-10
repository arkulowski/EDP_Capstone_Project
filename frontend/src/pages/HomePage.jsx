// frontend/src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import SearchBar     from '../components/ui/SearchBar';
import EmployeeList  from '../components/ui/EmployeeList';
import { fetchEmployees } from '../api';

export default function HomePage() {
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    fetchEmployees('').then(setEmps).catch(console.error);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Employee Directory</h1>
      <SearchBar onSearch={term => 
        fetchEmployees(term).then(setEmps).catch(console.error)
      }/>
      <EmployeeList list={emps} />
    </div>
  );
}
