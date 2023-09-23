import React, { useEffect, useState } from "react";
import "./AddFriend.scss";
import { Link, useLocation } from "react-router-dom";

const AddFriend = ({ getTheUrl }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "male", // Default gender selection
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    agreeToTerms: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleGenderChange = (selectedGender) => {
    setFormData({
      ...formData,
      gender: selectedGender,
    });
  };
  const handleUnknownTimeOfBirthChange = () => {
    const newUnknownTimeOfBirth = !formData.unknownTimeOfBirth;
    const newTimeOfBirth = newUnknownTimeOfBirth ? "12:00" : ""; // Set to default if unknown
    setFormData({
      ...formData,
      unknownTimeOfBirth: newUnknownTimeOfBirth,
      timeOfBirth: newTimeOfBirth,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Handle form submission here, e.g., send data to a server
  };
  //path
  const location = useLocation();
  useEffect(() => {
    getTheUrl(location?.pathname);
    return () => {
      getTheUrl("");
    };
  }, [location?.pathname]);
  return (
    <div className="addFriend">
      <h1>React Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="gender-toggle">
          <label>Gender:</label>
          <div className="gender-button">
            <button
              type="button"
              className={`gender-option ${formData.gender === "male" ? "active" : ""}`}
              onClick={() => handleGenderChange("male")}>
              Male
            </button>
            <button
              type="button"
              className={`gender-option ${formData.gender === "female" ? "active" : ""}`}
              onClick={() => handleGenderChange("female")}>
              Female
            </button>
          </div>
        </div>
        <div>
          <label>Place of Birth:</label>
          <input
            type="text"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time of Birth:</label>
          <input
            type="time"
            name="timeOfBirth"
            value={formData.timeOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="toggle-switch-container">
          <label className="toggle-switch-label">Unknown Time of Birth:</label>
          <div
            className={`toggle-switch ${formData.unknownTimeOfBirth ? "active" : ""}`}
            onClick={handleUnknownTimeOfBirthChange}>
            <div className="toggle-switch-slider"></div>
            <span className="toggle-switch-text">{formData.unknownTimeOfBirth ? "Yes" : "No"}</span>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFriend;
