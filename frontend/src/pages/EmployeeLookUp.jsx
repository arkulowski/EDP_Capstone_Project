import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

// Utility to debounce individual query inputs
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const EmployeeLookUp = () => {
  const [firstNameQuery, setFirstNameQuery] = useState('');
  const [lastNameQuery, setLastNameQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce each query separately
  const debouncedFirstName = useDebounce(firstNameQuery, 500);
  const debouncedLastName = useDebounce(lastNameQuery, 500);

  // Fetch results from the backend when either query changes
  useEffect(() => {
    if (!debouncedFirstName && !debouncedLastName) {
      setResults([]);  // Clear results if both queries are empty
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SOCKS_API_URL}/search?fQuery=${debouncedFirstName}&lQuery=${debouncedLastName}`,
          { method: "GET" }
        );
        const data = await response.json();
        console.log(data);  // Log the response for debugging
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedFirstName, debouncedLastName]);

  return (
    <div>
      <input
        type="text"
        value={firstNameQuery}
        onChange={(e) => setFirstNameQuery(e.target.value)}
        placeholder="Search by First Name"
      />
      <input
        type="text"
        value={lastNameQuery}
        onChange={(e) => setLastNameQuery(e.target.value)}
        placeholder="Search by Last Name"
      />
      
      {/* Loading and results */}
      {loading && <p>Loading...</p>}
      <ul>
        {results.length === 0 && !loading && <li>No results found</li>}
        {results.map((item) => (
          <li key={item.employee_id}>{item.firstname} {item.lastname}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeLookUp;
