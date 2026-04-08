import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "../components/PersonalDetails";
import FinancialDetails from "../components/FinancialDetails";
import LoanDetails from "../components/LoanDetails";
import EmploymentDetails from "../components/EmploymentDetails";
import bgImage from "../assets/finance-bg.png";

function LoanForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePredict = async () => {
    const requiredFields = [
      "Monthly_Income",
      "Loan_Amount",
      "Loan_Term",
      "Existing_EMI",
      "Other_Debt",
      "Applicant_Income"
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field] === "") {
        alert(field + " is required");
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch("https://loan-risk-assessment-system-backend.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API RESPONSE:", data);
      navigate("/result", { state: data });
    } catch (error) {
      console.error("FETCH ERROR:", error);
      alert("Something went wrong while predicting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loan-page">
      <div className="top-banner">
        <div className="banner-content">
          <div className="shield-icon">✔</div>
          <div>
            <h1>CreditWise AI</h1>
            <p>Intelligent Loan Risk Assessment System</p>
          </div>
        </div>
      </div>

      <div
        className="background-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="form-wrapper">
          <div className="form-card">
            <h3 className="form-main-heading">Loan Application Form</h3>
            <p className="form-subheading">
              Please enter accurate details for AI-based risk evaluation.
            </p>

            <PersonalDetails formData={formData} setFormData={setFormData} />
            <EmploymentDetails formData={formData} setFormData={setFormData} />
            <FinancialDetails formData={formData} setFormData={setFormData} />
            <LoanDetails formData={formData} setFormData={setFormData} />

            <button
              className="predict-btn mt-3"
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Predicting...
                </>
              ) : (
                "Predict Loan Status"
              )}
            </button>

            {loading && (
              <p className="mt-3 text-center">
                Please wait, prediction is being generated...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanForm;