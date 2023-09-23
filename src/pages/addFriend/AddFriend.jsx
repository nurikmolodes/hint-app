import React, { useEffect, useRef, useState } from "react";
import "./AddFriend.scss";
import { Link, useLocation } from "react-router-dom";
import user from "../../assets/male.svg";
import back from "../../assets/back.svg";
import Loading from "../../components/Loading";

const AddFriend = ({ getTheUrl }) => {
  const dateInputRef = useRef(null);
  console.log(dateInputRef);

  const handleButtonClick = () => {
    dateInputRef.current.click();
  };

  const [formData, setFormData] = useState({
    name: "",
    gender: "male", // Default gender selection
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    agreeToTerms: false,
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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
    setLoadingSubmit(true);
    event.preventDefault();
    console.log(formData);
    // Handle form submission here, e.g., send data to a server
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 5000);
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
    <div className={'addFriend'}>
      {/* <Loading /> */}
      <header>
        <div className="back">
          <Link to={"/"}>
            <img src={back} />
          </Link>
        </div>
        <div className="user">
          <img src={user} />
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <label>Name*</label>
          <input
            placeholder="Your friend's name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="gender">
          <label>Gender</label>
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
        <div className="date">
          <label htmlFor="date">Date of Birth*</label>
          <div className="date-input-container">
            <input
              placeholder="YYYY-MM-DD"
              type="date"
              id="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              ref={dateInputRef}
              required
            />
          </div>
        </div>
        <div className="birth">
          <label onClick={handleButtonClick}>Time of Birth*</label>
          <input
            type="time"
            name="timeOfBirth"
            value={formData.timeOfBirth}
            onChange={handleChange}
            required
          />
          <p>
            Don’t worry if you don’t know the exact birth time, you can still find plenty of
            insights using the default setting.
          </p>
        </div>
        <div className="toggle-switch-container">
          <label className="toggle-switch-label">“I don’t know. Set to default (12:00 PM)”</label>
          <div
            className={`toggle-switch ${formData.unknownTimeOfBirth ? "active" : ""}`}
            onClick={handleUnknownTimeOfBirthChange}>
            <div className="toggle-switch-slider"></div>
          </div>
        </div>
        <div className="place">
          <label>Place of Birth*</label>
          <input
            type="text"
            placeholder="Location, State, Country"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            required
          />
          <p>Don’t know the city? Just add country.</p>
        </div>
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFriend;
