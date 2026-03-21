import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../assets/finance-bg.png";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaExclamationCircle,
} from "react-icons/fa";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="container mt-4">
        <h3>No prediction data found.</h3>
        <button
          className="btn btn-primary mt-2"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const probability = data["Approval Probability"];
  const risk = data["Risk Category"];
  const reasons = data["Reasons"];

  return (
    <div className="result-page">
      <div
        className="background-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="result-card">
          <h2>Loan Risk Assessment</h2>

          <div
            className={`risk-box ${risk === "Low Risk"
                ? "green-bg"
                : risk === "Medium Risk"
                  ? "yellow-bg"
                  : "red-bg"
              }`}
          >
            <div className="icon-container">
              {risk === "Low Risk" && (
                <FaCheckCircle size={70} className="low-icon" />
              )}

              {risk === "Medium Risk" && (
                <FaExclamationCircle size={70} className="medium-icon" />
              )}

              {risk === "High Risk" && (
                <FaExclamationTriangle size={70} className="high-icon" />
              )}
            </div>

            <h3>{risk}</h3>
            <p>Approval Probability: {probability} %</p>

            {reasons && (
              <div className="mt-3">
                <h5>Reasons:</h5>
                <ul>
                  {reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            className="predict-btn mt-3"
            onClick={() => navigate("/")}
          >
            Predict Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;