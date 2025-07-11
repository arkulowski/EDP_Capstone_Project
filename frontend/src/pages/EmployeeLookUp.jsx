import { useEffect, useState } from 'react';

export default function EmployeeLookup() {
  const [employees,  setEmployees]  = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);

  // 1) Load all on mount
  useEffect(() => {
    setLoading(true);
    fetch('/api/employees')
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => setEmployees(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // 2) Search handler
  const handleSearch = e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = searchTerm
      ? `/api/search?q=${encodeURIComponent(searchTerm)}`
      : '/api/employees';

    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => setEmployees(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <h2>Employee Directory</h2>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by first or last name…"
        />
        <button type="submit">Go</button>
      </form>

      {loading && <p>Loading…</p>}
      {error   && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && employees.length === 0 && <p>No results</p>}

      <ul className="employee-list">
        {employees.map(emp => (
          <li className="employee-card" key={emp.employee_id}>
            <div className="employee-name">
              {emp.firstname} {emp.lastname}
            </div>
            <div className="employee-meta">
              {emp.job_title || '–'} • {emp.department || '–'}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
