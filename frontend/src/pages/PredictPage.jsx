import React, { useState } from "react";
//import { useAuth } from '../hooks/AuthContext';

const PredictPage = () => {
  //const { user } = useAuth();

  const [salaryData, setSalaryData] = useState({
    education_level: 0,
    years_of_experience: 0,
    country: "us"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSalaryData({
      ...salaryData,
      sockDetails: { ...salaryData, [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the current timestamp
    const submission = salaryData

    try {
      // TODO: Make a POST request to the API to add the sock
      const response = await fetch('http://localhost:5000/estimate_salary', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle post submission logic (like showing a success message)
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
    }
  };

  return (
    <div className="row">
      <div>
        <h5>Welcome, PLACEHOLDER! Your UID is PLACEHOLDER</h5> : <h1>Please log in.</h1>
      </div>
      <div className="col-4">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              value="PLACEHOLDER"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              name="jobTitle"
              value="PLACEHOLDER"
            />
          </div>
          {/* Education Level */}
          <div className="form-group">
            <label htmlFor="educationLevel">Education Level</label>
            <select
              className="form-control"
              id="educationLevel"
              name="educationLevel"
              value={salaryData.education_level}
              onChange={handleChange}
            >
              <option>High School</option>
              <option>Undergraduate Degree</option>
              <option>Graduate Degree</option>
              <option>PHD</option>
            </select>
          </div>
          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              className="form-control"
              id="country"
              name="country"
              value={salaryData.country}
              onChange={handleChange}
            >
              <option>us</option>
              <option>ca</option>
              <option>uk</option>
              <option>au</option>
              <option>cn</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PredictPage;