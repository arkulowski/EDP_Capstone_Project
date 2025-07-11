import React from "react";
import "./DisplayCard.css"; // import the new CSS file

const DisplayCard = (
  {
    employee_id,
    manager_id,
    firstname,
    lastname,
    phone_number,
    Age,
    Gender,
    Country,
    Race,
    Job_Title,
    Senior,
    Education_Level,
    Years_of_Experience,
    Salary
  }
) => {
  return (
    <div className="display-card">
      <div className="card-content">
        <span className="badge">{firstname} {lastname}</span>
        <span className="price">{Job_Title}</span>
        <p>
          {phone_number}
        </p>
        <p>
          {Country}
        </p>
      </div>
      <button className="cta-button">{Salary ? `Salary: $${Salary}` : "Salary : xxxxxx"}</button>
      <Background />
    </div>
  );
};

const Background = () => {
  return (
    <svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="card-background"
    >
      <circle
        className="bg-circle"
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <ellipse
        className="bg-ellipse"
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </svg>
  );
};

export default DisplayCard;
