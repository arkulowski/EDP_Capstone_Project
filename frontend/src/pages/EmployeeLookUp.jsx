import React, { useState, useEffect } from "react";
import DisplayCard from "../components/DisplayCard";
import "./lookup.css";

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
          const employeeId = localStorage.getItem('employeeId');
      
          const response = await fetch(
            `${import.meta.env.VITE_SOCKS_API_URL}/search?fQuery=${debouncedFirstName}&lQuery=${debouncedLastName}`,
            {
              method: 'GET',
              headers: employeeId
                ? { 'x-employee-id': employeeId }
                : undefined,
            }
          );
      
          const data = await response.json();
          console.log(data); // Log the response for debugging
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
        <div className="input-row">
                <input
                type="text"
                value={firstNameQuery}
                onChange={(e) => setFirstNameQuery(e.target.value)}
                placeholder="Search by First Name"
                defaultValue="A"
            />
            <input
                type="text"
                value={lastNameQuery}
                onChange={(e) => setLastNameQuery(e.target.value)}
                placeholder="Search by Last Name"
                style={{ marginLeft: "20px" }}
            />
        </div>
      
      
      {/* Loading and results */}
      {loading && <p>Loading...</p>}
      <div className="card-container">
        {results.length === 0 && !loading && <div></div>}
        {results.map((item) => (
          <DisplayCard
            key={item.employee_id}
            employee_id={item.employee_id}
            manager_id={item.manager_id}
            firstname={item.firstname}
            lastname={item.lastname}
            phone_number={item.phone_number}
            Age={item.Age}
            Gender={item.Gender}
            Country={item.Country}
            Race={item.Race}
            Job_Title={item.Job_Title}
            Senior={item.Senior}
            Education_Level={item.Education_Level}
            Years_of_Experience={item.Years_of_Experience}
            Salary={item?.Salary}
        />
        ))}
      </div>
    </div>
  );
};

export default EmployeeLookUp;
