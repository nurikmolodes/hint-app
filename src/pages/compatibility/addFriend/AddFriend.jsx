import React, { useEffect, useRef, useState } from "react";
import "./AddFriend.scss";
import { Link, useNavigate } from "react-router-dom";
import userImage from "../../../assets/male.svg";
import back from "../../../assets/back.svg";
import Loading from "../../../components/Loading";
import axios from "axios";
import notFound from "../../../assets/notFound.svg";
import DateSelector from "../../../components/compatibility/dateSelector/DateSelector";
import TimeSelector from "../../../components/compatibility/timeSelector/TimeSelector";

const AddFriend = ({ getTheResultsCompatibility, user }) => {
  const navigate = useNavigate();
  // LOADING
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    setAccessToken(token?.token);
  }, []);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [saveData, setSavedData] = useState(null);
  console.log(saveData);
  const [formData, setFormData] = useState({
    name: saveData?.partnerInfo?.name || "",
    gender: "male", // Default gender selection
    dateOfBirth: "1991-01-01",
    timeOfBirth: "00:00",
    placeOfBirth: "",
    lat: "",
    lon: "",
    unknownTimeOfBirth: false,
  });
  useEffect(() => {
    const storedData = localStorage.getItem("myPartner");

    if (storedData) {
      // If data is found, parse it from a JSON string to an object
      const parsedObject = JSON.parse(storedData);
      setFormData(parsedObject?.partnerInfo);
    }
  }, []);
  // FORM

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
  const selectCity = (city, lat, lon) => {
    console.log(city);
    setFormData({ ...formData, placeOfBirth: city, lat: lat, lon: lon });
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
      dateOfBirth: user?.info?.birth_date,
      timeOfBirth: user?.info.birth_time,
      lat: user?.info?.latitude,
      lon: user?.info?.longitude,
    },
    partnerInfo: {
      dateOfBirth: formData.dateOfBirth,
      timeOfBirth: formData.timeOfBirth,
      name: formData.name,
      lat: formData.lat,
      lon: formData.lon,
      placeOfBirth: formData.placeOfBirth,
      gender: formData.gender,
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
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // Handle the response here (e.g., update state with the response data)
      getTheResultsCompatibility({ ...response.data, partnerName: formData.name });
      // Handle form submission here, e.g., send data to a server
      localStorage.setItem("myPartner", JSON.stringify(params));
      setLoadingSubmit(false);
      navigate("/resultsCompatibility");
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
                  <img src={userImage} />
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
                          <span
                            onClick={() => selectCity(a.place_name, a.latitude, a.longitude)}
                            key={a.place_name}>
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
                  <button type="submit">Submit</button>
                </div>
              )}
            </form>
            {showDate && <DateSelector getDate={getDate} />}
            {showTime && <TimeSelector getTime={getTime} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFriend;
