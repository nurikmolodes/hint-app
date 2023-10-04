import React, { useEffect, useState } from "react";
import "./Horoscope.scss";
import HoroscopeContent from "../../components/horoscope/HoroscopeContent";
import axios from "axios";

const Horoscope = () => {
  const [activeItem, setActiveItem] = useState({ id: 1, text: "Today", value: "daily" });
  console.log(activeItem);

  const items = [
    { id: 1, text: "Today", value: "daily" },
    { id: 2, text: "Tomorrow", value: "next" },
    { id: 3, text: "Week", value: "weekly" },
    { id: 4, text: "Month", value: "monthly" },
  ];

  const handleItemClick = (text) => {
    if (text.value !== activeItem.value) {
      setLoadingMainInfo(true);
      setLoadingHoroscope(true);
      setActiveItem(text);
    }
  };
  // USER
  const [user, setUser] = useState(null);
  const [horoscope, setHoroscope] = useState([]);
  const [mainInfo, setMainInfo] = useState([]);
  const [loadingHoroscope, setLoadingHoroscope] = useState(true);
  const [loadingMainInfo, setLoadingMainInfo] = useState(true);
  console.log(horoscope);
  const params = {
    email: "nurikgentle@gmail.com",
    password: "ND#3XAb",
  };

  const getUser = () => {
    // Send a POST request using Axios
    axios
      .post(`https://api.astropulse.app/api/auth`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getHoroscope = async (active) => {
    try {
      const response = await axios.post(
        `https://api.astropulse.app/api/astro/horoscope/${active.value}`,
        {
          dateOfBirth: "1980-02-10",
          name: "fName",
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ0b2tlbklkIjoiMTcxZTk2MTEtNzkwYy00ZjU4LWI5ZmUtMmM2ODAyZDljYjg1IiwiaWF0IjoxNjk1NzkyNjQ2fQ.Xo9EZCWwa7S4iN-O5MupiKmQpMXtuH1JXGZ5kMf6fSE`,
          },
        },
      );
      // Handle the response here (e.g., update state with the response data)
      setHoroscope({ ...response.data });
      setLoadingHoroscope(false);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };
  const getMainInfo = async () => {
    try {
      const response = await axios.post(
        `https://api.astropulse.app/api/astro/personality_report`,
        {},
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ0b2tlbklkIjoiMTcxZTk2MTEtNzkwYy00ZjU4LWI5ZmUtMmM2ODAyZDljYjg1IiwiaWF0IjoxNjk1NzkyNjQ2fQ.Xo9EZCWwa7S4iN-O5MupiKmQpMXtuH1JXGZ5kMf6fSE`,
          },
        },
      );
      // Handle the response here (e.g., update state with the response data)
      setMainInfo({ ...response.data });
      setLoadingMainInfo(false);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getHoroscope(activeItem);
    getMainInfo();
  }, [activeItem.value]);
  return (
    <div className="horoscope">
      <div className="greeting">
        <h1>Hi {user?.info?.name},</h1>
      </div>
      <div className="options">
        {items.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className={`clickable-item ${activeItem.text === item.text ? "active" : ""}`}
            onClick={() => handleItemClick(item)}>
            {item.text}
          </div>
        ))}
      </div>
      <HoroscopeContent
        mainInfo={mainInfo}
        horoscope={horoscope}
        loadingHoroscope={loadingHoroscope}
        loadingMainInfo={loadingMainInfo}
      />
    </div>
  );
};

export default Horoscope;
