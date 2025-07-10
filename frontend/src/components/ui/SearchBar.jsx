// frontend/src/components/ui/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSearch(term.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Search by name/role/location"
      />
      <button type="submit">Search</button>
    </form>
  );
}
