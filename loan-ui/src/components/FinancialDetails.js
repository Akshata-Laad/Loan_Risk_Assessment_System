const FinancialDetails = ({ formData, setFormData }) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const income = formData.Monthly_Income || 0;
  const emi = formData.Existing_EMI || 0;
  const otherDebt = formData.Other_Debt || 0;

  let dti = 0;
  if (income > 0) {
    dti = (((emi + otherDebt) / income) * 100).toFixed(2);
  }

  return (
    <div className="card mb-4 p-4 shadow-sm">
      <h5 className="section-title mb-4">Financial Details</h5>

      <div className="form-grid">

        <input type="number"
          name="Applicant_Income"
          placeholder="Applicant Income"
          className="form-control"
          onChange={handleChange}
        />

        <input type="number"
          name="Coapplicant_Income"
          placeholder="Coapplicant Income"
          className="form-control"
          onChange={handleChange}
        />

        <input type="number"
          name="Credit_Score"
          placeholder="Credit Score"
          className="form-control"
          onChange={handleChange}
        />

        <input type="number"
          name="Savings"
          placeholder="Savings"
          className="form-control"
          onChange={handleChange}
        />

        <input type="number"
          name="Existing_Loans"
          placeholder="Existing Loans"
          className="form-control"
          onChange={handleChange}
        />

        <input type="number"
          name="Collateral_Value"
          placeholder="Collateral Value"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      {/* 🔥 Debt Ratio Section */}

      <div className="mt-4">
        <h6 className="fw-bold">Debt Ratio</h6>
        <p className="text-muted mb-3">
          Enter income and liabilities to calculate Debt-to-Income ratio
        </p>

        <div className="form-grid">

          <input
            type="number"
            name="Monthly_Income"
            placeholder="Monthly Income"
            className="form-control"
            onChange={handleChange}
          />

          <input
            type="number"
            name="Existing_EMI"
            placeholder="Existing EMI"
            className="form-control"
            onChange={handleChange}
          />

          <input
            type="number"
            name="Other_Debt"
            placeholder="Other Monthly Debt"
            className="form-control"
            onChange={handleChange}
          />

        </div>

        {income > 0 && (
          <div className="mt-3">
            <span
              className={`badge p-2 ${dti < 30
                  ? "bg-success"
                  : dti < 50
                    ? "bg-warning"
                    : "bg-danger"
                }`}
            >
              DTI: {dti}%
            </span>
          </div>
        )}

      </div>

    </div>
  );
};

export default FinancialDetails;