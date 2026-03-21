function LoanDetails({ formData, setFormData }) {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card mb-4 p-3 shadow-sm">
      <h5 className="section-title">Loan Details</h5>

      <div className="form-grid">
        {/* Loan Amount */}
        <input
          type="number"
          name="Loan_Amount"
          placeholder="Loan Amount"
          className="form-control mb-2"
          value={formData.Loan_Amount || ""}
          onChange={handleChange}
        />

        {/* Loan Term */}
        <input
          type="number"
          name="Loan_Term"
          placeholder="Loan Term (in months)"
          className="form-control mb-2"
          value={formData.Loan_Term || ""}
          onChange={handleChange}
        />

        {/* Loan Purpose */}
        <select
          name="Loan_Purpose"
          className="form-control mb-2"
          value={formData.Loan_Purpose || ""}
          onChange={handleChange}
        >
          <option value="">Select Loan Purpose</option>
          <option value="Personal">Personal</option>
          <option value="Car">Car</option>
          <option value="Business">Business</option>
          <option value="Home">Home</option>
          <option value="Education">Education</option>
        </select>

      </div>
    </div>
  );
}

export default LoanDetails;