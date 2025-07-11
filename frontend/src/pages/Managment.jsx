import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import DisplayCard from "../components/DisplayCard";
import "./lookup.css";

export default function Managment() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
    const fetchResults = async () => {
      const employeeId = localStorage.getItem("employeeId");

      // 👇 Redirect if no employeeId found
      if (!employeeId) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SOCKS_API_URL}/managment`,
          {
            method: "GET",
            headers: {
              "x-employee-id": employeeId,
            },
          }
        );

        const data = await response.json();
        console.log(data); // Log the response for debugging
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [navigate]); // 👈 include navigate in dependency array

  return (
    <div>
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
            Job_Title={item["Job Title"]}
            Senior={item.Senior}
            Education_Level={item.Education_Level}
            Years_of_Experience={item.Years_of_Experience}
            Salary={item?.Salary}
          />
        ))}
      </div>
    </div>
  );
}
