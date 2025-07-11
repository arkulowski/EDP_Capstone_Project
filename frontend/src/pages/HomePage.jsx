import React, { useState, useEffect } from 'react';
import SearchBar     from '../components/ui/SearchBar';
import EmployeeList  from '../components/ui/EmployeeList';
import { fetchEmployees } from '../api';

export default function HomePage() {
  const [emps, setEmps]     = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async term => {
    setLoading(true);
    try {
      const data = await fetchEmployees(term);
      setEmps(data);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doSearch('');   
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Employee Directory</h1>
      <SearchBar onSearch={doSearch} />
      {loading ? <p>Loading…</p> : <EmployeeList list={emps} />}
    </div>
  );
}
