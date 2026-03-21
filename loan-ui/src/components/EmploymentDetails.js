const EmploymentDetails = ({ formData, setFormData }) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card mb-4 p-3 shadow-sm">
      <h5 className="section-title">Employment Details</h5>
      <div className="form-grid">

        <select name="Employment_Status"
          className="form-control mb-2"
          onChange={handleChange}>

          <option value="">Employment Status</option>
          <option value="Salaried">Salaried</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Unemployed">Unemployed</option>
        </select>

        {formData.Employment_Status !== "Unemployed" && (
          <select name="Employer_Category"
            className="form-control mb-2"
            onChange={handleChange}>

            <option value="">Employer Category</option>
            <option value="MNC">MNC</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
            <option value="Business">Business</option>
          </select>
        )}

        <select name="Property_Area"
          className="form-control mb-2"
          onChange={handleChange}>

          <option value="">Property Area</option>
          <option value="Urban">Urban</option>
          <option value="Semiurban">Semiurban</option>
          <option value="Rural">Rural</option>
        </select>
      </div>
    </div>
  );
};

export default EmploymentDetails;