const PersonalDetails = ({ formData, setFormData }) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value
    });
  };

  return (
    <div className="card mb-4 p-4 shadow-sm">
      <h5 className="section-title">Personal Details</h5>

      <div className="form-grid">
        <input type="number" name="Age"
          placeholder="Age"
          className="form-control"
          onChange={handleChange} />

        <select name="Gender"
          className="form-control"
          onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select name="Marital_Status"
          className="form-control"
          onChange={handleChange}>
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
      </div>
    </div>
  );
};

export default PersonalDetails;