import React, { useEffect, useRef, useState } from "react";
import "./UserUpdate.scss";
import { Link, useNavigate } from "react-router-dom";
import back from "../../../assets/back.svg";
import axios from "axios";
import notFound from "../../../assets/notFound.svg";
import DateSelector from "../../../components/compatibility/dateSelector/DateSelector";
import TimeSelector from "../../../components/compatibility/timeSelector/TimeSelector";

const UserUpdate = ({ user }) => {
  const navigate = useNavigate();
  // LOADING
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  // FORM
  const [formData, setFormData] = useState({
    name: user?.info?.name,
    gender: "Male", // Default gender selection
    dateOfBirth: user?.info?.birth_date,
    timeOfBirth: "00:00",
    placeOfBirth: "",
    lat: "",
    lon: "",
    unknownTimeOfBirth: false,
  });
  //date
  const [showDate, setShowDate] = useState(false);
  const getDate = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
    setShowDate(false);
  };
  //time
  const [showTime, setShowTime] = useState(false);
  const getTime = (date) => {
    setFormData({ ...formData, timeOfBirth: date.trim() });
    setShowTime(false);
  };
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
    setFormData({
      ...formData,
      placeOfBirth: city?.place_name,
      lon: city?.longitude,
      lat: city?.latitude,
    });
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
  console.log(user);
  const params = {
    name: formData.name,
    dateOfBirth: formData.dateOfBirth,
    lat: formData.lat,
    lon: formData.lon,
    timeOfBirth: formData.timeOfBirth,
    placeOfBirth: formData.placeOfBirth,
    gender: formData.gender,
  };
  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.patch("https://api.astropulse.app/api/users/profile", params, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.replace("/horoscope");
      console.log(response);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };

  // PLACES
  const [cities, setCities] = useState([]);
  const fetchPlaces = async (K) => {
    setShowCities(true);
    setFormData({ ...formData, placeOfBirth: K });
    setShowContent(K === "");
    const url = `https://api.astropulse.app/api/astro/search/${K}`;

    try {
      const place = await axios.get(url);
      setCities(place.data?.geonames);
      console.log(cities);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (showDate || showTime) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showDate, showTime]);

  return (
    <div className="user-update">
      <div className="form">
        {showContent && (
          <header>
            <div className="back">
              <Link onClick={() => navigate(-1)}>
                <img src={back} />
              </Link>
            </div>
          </header>
        )}
        <form onSubmit={handleSubmit}>
          {showContent && (
            <>
              <div className="name">
                <label>Name</label>
                <input
                  placeholder="Name"
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
                    className={`gender-option ${formData.gender === "Male" ? "active" : ""}`}
                    onClick={() => handleGenderChange("Male")}>
                    Male
                  </button>
                  <button
                    type="button"
                    className={`gender-option ${formData.gender === "Female" ? "active" : ""}`}
                    onClick={() => handleGenderChange("Female")}>
                    Female
                  </button>
                </div>
              </div>
              <div className="date">
                <label htmlFor="date">Date of Birth*</label>
                <div className="date-input-container">
                  <div className="input" onClick={() => setShowDate(true)}>
                    {formData.dateOfBirth}
                  </div>
                </div>
              </div>
              <div className="birth">
                <label onClick={handleButtonClick}>Time of Birth*</label>
                <div className="input" onClick={() => setShowTime(true)}>
                  {formData.timeOfBirth}
                </div>
                <p>
                  Don’t worry if you don’t know the exact birth time, you can still find plenty of
                  insights using the default setting.
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
                      <span onClick={() => selectCity(a)} key={a.place_name}>
                        {a.place_name}
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
              <button type="submit">Apply</button>
            </div>
          )}
        </form>
        {showDate && <DateSelector getDate={getDate} />}
        {showTime && <TimeSelector getTime={getTime} />}
      </div>
    </div>
  );
};

export default UserUpdate;
