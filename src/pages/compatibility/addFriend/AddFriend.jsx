import React, { useEffect, useRef, useState } from "react";
import "./AddFriend.scss";
import { Link, useNavigate } from "react-router-dom";
import user from "../../../assets/male.svg";
import back from "../../../assets/back.svg";
import Loading from "../../../components/Loading";
import axios from "axios";
import notFound from "../../../assets/notFound.svg";

const AddFriend = () => {
  const navigate = useNavigate();
  // LOADING
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  // FORM
  const [formData, setFormData] = useState({
    name: "",
    gender: "male", // Default gender selection
    dateOfBirth: "1991-01-01",
    timeOfBirth: "00:00",
    placeOfBirth: "",
    unknownTimeOfBirth: false,
  });
  // DATE
  const handleUnknownTimeOfBirthChange = () => {
    const newUnknownTimeOfBirth = !formData.unknownTimeOfBirth;
    const newTimeOfBirth = newUnknownTimeOfBirth ? "12:00" : "00:00"; // Set to default if unknown
    setFormData({
      ...formData,
      unknownTimeOfBirth: newUnknownTimeOfBirth,
      timeOfBirth: newTimeOfBirth,
    });
  };
  const dateInputRef = useRef(null);
  console.log(dateInputRef);

  const handleButtonClick = () => {
    dateInputRef.current.click();
  };
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  // CITIES
  const [showContent, setShowContent] = useState(true);
  const [showCities, setShowCities] = useState(false);
  const selectCity = (city) => {
    console.log(city);
    setFormData({ ...formData, placeOfBirth: city });
    setShowCities(false);
    setShowContent(true);
  };
  // GENDER
  const handleGenderChange = (selectedGender) => {
    setFormData({
      ...formData,
      gender: selectedGender,
    });
  };
  // SUBMIT FORM
  const handleSubmit = (event) => {
    setLoadingSubmit(true);
    event.preventDefault();
    console.log(formData);
    // Handle form submission here, e.g., send data to a server
    setTimeout(() => {
      setLoadingSubmit(false);
      navigate("/resultsCompatibility");
    }, 5000);
  };

  // PLACES
  const [cities, setCities] = useState([]);
  const fetchPlaces = async (K) => {
    setShowCities(true);
    setFormData({ ...formData, placeOfBirth: K });
    setShowContent(K === "");
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "d8dfbebbee14478cd5328086951a7d38b3aaec9d";

    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
    };

    try {
      const place = await axios.post(
        url,
        {
          query: K,
          locations: [{ country: "*" }],
          language: "en",
        },
        options,
      );
      setCities(place.data.suggestions);
      console.log(cities);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {loadingSubmit ? (
        <Loading />
      ) : (
        <div className="addFriend">
          <div className="form">
            {showContent && (
              <header>
                <div className="back">
                  <Link onClick={() => navigate(-1)}>
                    <img src={back} />
                  </Link>
                </div>
                <div className="user">
                  <img src={user} />
                </div>
              </header>
            )}
            <form onSubmit={handleSubmit}>
              {showContent && (
                <>
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
                      Don’t worry if you don’t know the exact birth time, you can still find plenty
                      of insights using the default setting.
                    </p>
                  </div>
                  <div className="toggle-switch-container">
                    <label className="toggle-switch-label">
                      “I don’t know. Set to default (12:00 PM)”
                    </label>
                    <div
                      className={`toggle-switch ${formData.unknownTimeOfBirth ? "active" : ""}`}
                      onClick={handleUnknownTimeOfBirthChange}>
                      <div className="toggle-switch-slider"></div>
                    </div>
                  </div>
                </>
              )}
              <div className="place">
                <label>Place of Birth*</label>
                <input
                  type="text"
                  placeholder="Location, State, Country"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={(e) => fetchPlaces(e.target.value)}
                  required
                />
                {showCities && (
                  <>
                    <div className="cities">
                      {cities &&
                        cities?.map((a) => (
                          <span onClick={() => selectCity(a.value)} key={a.value}>
                            {a.value}
                          </span>
                        ))}
                    </div>
                    {cities.length === 0 && (
                      <div className="notFound">
                        <img src={notFound} />
                        <p>no results found</p>
                      </div>
                    )}
                  </>
                )}
                <p>Don’t know the city? Just add country.</p>
              </div>
              {showContent && (
                <div className="submit">
                  <button type="submit">Submit</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFriend;
