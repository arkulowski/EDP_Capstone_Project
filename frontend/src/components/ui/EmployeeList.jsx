import React from 'react';
import EmployeeCard from './EmployeeCard';


export default function EmployeeList({ list }) {
  if (!list || list.length === 0) return <p>No results</p>;
  return (
    <div className="employee-list">
      {list.map(emp => (
        <EmployeeCard key={emp._id} emp={emp} />
      ))}
    </div>
  );
}
