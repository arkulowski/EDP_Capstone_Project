import React from 'react';
import SearchBar from '../components/ui/SearchBar';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Employee Directory</h1>
      <p>Use the search bar below to find people:</p>
      <SearchBar onSearch={term => {
        console.log('search for:', term);
        // later you’ll hook this up to fetchEmployees(term)
      }} />
    </div>
  );
}
