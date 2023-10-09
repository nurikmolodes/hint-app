import React, { useEffect, useRef, useState } from "react";
import "./UserUpdate.scss";
import { Link, useNavigate } from "react-router-dom";
import back from "../../../assets/back.svg";
import axios from "axios";
import notFound from "../../../assets/notFound.svg";
import DateSelector from "../../../components/compatibility/dateSelector/DateSelector";
import TimeSelector from "../../../components/compatibility/timeSelector/TimeSelector";

const UserUpdate = () => {
  // USER
  const [user, setUser] = useState(null);

  const data = {
    email: "nurikgentle@gmail.com",
    password: "ND#3XAb",
  };

  const getUser = () => {
    // Send a POST request using Axios
    axios
      .post("https://api.astropulse.app/api/auth", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
  useEffect(() => {
    getUser();
  }, []);
  //date
  const [showDate, setShowDate] = useState(false);
  const getDate = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
    setShowDate(false);
  };
  //time
  const [showTime, setShowTime] = useState(false);
  const getTime = (date) => {
    setFormData({ ...formData, timeOfBirth: date });
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
  console.log(user);
  const params = {
    yourGender: "Male",
    yourInfo: {
      dateOfBirth: user?.info?.birth_date || "2001-04-07",
      timeOfBirth: user?.info.birth_time || "10:67",
      lat: "7.57944",
      lon: "-8.53778",
    },
    partnerInfo: {
      dateOfBirth: formData.dateOfBirth,
      timeOfBirth: formData.timeOfBirth,
      name: formData.name,
      lat: "7.57944",
      lon: "-8.53778",
    },
    relationshipStatus: "crush",
  };
  const handleSubmit = async (event) => {
    setLoadingSubmit(true);
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "https://api.astropulse.app/api/astro/compatibility",
        params,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ0b2tlbklkIjoiMTcxZTk2MTEtNzkwYy00ZjU4LWI5ZmUtMmM2ODAyZDljYjg1IiwiaWF0IjoxNjk1NzkyNjQ2fQ.Xo9EZCWwa7S4iN-O5MupiKmQpMXtuH1JXGZ5kMf6fSE`,
          },
        },
      );
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
                  placeholder='Name'
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
