// src/pages/Managment.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayCard from "../components/DisplayCard";
import "./lookup.css";

export default function Managment() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");

  // If not logged in, show placeholder
  if (!employeeId) {
    return (
      <div className="not-logged-in">
        <div className="card">
          <h2>Access Restricted</h2>
          <p>
            You must be logged in to view your team’s dashboard.
            Please log in to continue.
          </p>
          <button className="btn-login" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Pull their name out of storage
  let firstName = "";
  try {
    const stored = localStorage.getItem("employeeName");
    if (stored) {
      firstName = JSON.parse(stored).firstname;
    }
  } catch (e) {
    console.warn("Could not parse employeeName from localStorage", e);
  }

  // Fetch team members
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SOCKS_API_URL}/managment`,
          {
            method: "GET",
            headers: { "x-employee-id": employeeId },
          }
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [employeeId]);

  return (
    <div>
      {/* Welcome banner */}
      <h2 style={{ textAlign: "center", margin: "1.5rem 0" }}>
        Welcome{firstName ? `, ${firstName}` : ""}!
      </h2>

      {/* Loading state */}
      {loading && <p style={{ textAlign: "center" }}>Loading…</p>}

      {/* No results */}
      {!loading && results.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--fg)" }}>
          No team members found.
        </p>
      )}

      {/* Your cards */}
      <div className="card-container">
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
            Job_Title={item["Job Title"]}
            Senior={item.Senior}
            Education_Level={item.Education_Level}
            Years_of_Experience={item.Years_of_Experience}
            Salary={item.Salary}
          />
        ))}
      </div>
    </div>
  );
}


