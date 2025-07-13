import React, { useState } from "react";

const PredictPage = () => {

  const [salaryData, setSalaryData] = useState({
    job_title:null,
    education_level: 0,
    years_of_experience: 0,
    country: "us"
  });

  const [estimatedSalary, setEstimatedSalary] = useState(0.00)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSalaryData({
      ...salaryData, [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the current timestamp
    const submission = salaryData

    try {
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
      console.log(data)
      let roundedNumString = data['estimated_salary'].toFixed(2);
      let roundedNum = parseFloat(roundedNumString);
      setEstimatedSalary(roundedNum);


      // Handle post submission logic (like showing a success message)
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
    }
  };

  return (
    <div className="row">
      <div className="salary-estimator">
        <h5>Salary Estimator</h5>
        <div className="col-4">
          <form onSubmit={handleSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                name="job_title"
                value={salaryData.job_title}
                onChange={handleChange}
              />
            </div>
            {/* Education Level */}
            <div className="form-group">
              <label htmlFor="educationLevel">Education Level</label>
              <select
                className="form-control"
                id="educationLevel"
                name="education_level"
                value={salaryData.education_level}
                onChange={handleChange}
              >
                <option value="0">High School</option>
                <option value="1">Undergraduate</option>
                <option value="2">Postgraduate</option>
                <option value="3">PhD</option>
              </select>
            </div>

            {/* Years of expereience */}
            <div className="form-group">
              <label htmlFor="yearsOfExperience">Years of Experience</label>
              <input
                type="number"
                className="form-control"
                id="yearsOfExperience"
                name="years_of_experience"
                value={salaryData.years_of_experience}
                onChange={handleChange}
                min="0"
                step="1"
                onKeyDown={(e) => {
                  // Prevent decimal point
                  if (e.key === '.') {
                    e.preventDefault();
                  }
                }}
              />
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
          <div className="estimated-salary">
            Estimated Salary: <span>${estimatedSalary}</span>
          </div>
        </div>
      </div>
    </div>
  );

};

export default PredictPage;