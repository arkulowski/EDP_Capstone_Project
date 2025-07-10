import React from 'react';
import { useState } from 'react';


export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const submit = e => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={submit} style={{ marginTop: '1rem' }}>
      <input
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Search…"
        style={{ padding: '0.5rem', width: '200px' }}
      />
      <button type="submit" style={{ marginLeft: '0.5rem' }}>Go</button>
    </form>
  );
}
