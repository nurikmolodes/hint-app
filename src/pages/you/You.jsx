import React, { useState } from "react";
import "./You.scss";
import userAccount from "../../assets/userAccount.svg";
import palm from "../../assets/palm.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const You = ({ setResultsPalm }) => {
  const navigate = useNavigate();
  const [palmFile, setPalmFile] = useState(null);
  const sendPalmPhoto = (e) => {
    const file = e.target.files[0];
    setPalmFile(file);
    if (file) {
      const response = axios
        .post(
          "https://api.astropulse.app/api/read-palm",
          { image: file },
          {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ0b2tlbklkIjoiMTcxZTk2MTEtNzkwYy00ZjU4LWI5ZmUtMmM2ODAyZDljYjg1IiwiaWF0IjoxNjk1NzkyNjQ2fQ.Xo9EZCWwa7S4iN-O5MupiKmQpMXtuH1JXGZ5kMf6fSE",
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          },
        )
        .then((response) => {
          setResultsPalm(response.data);
          navigate("/palmresults");
        })
        .catch((error) => {
          // Handle errors here
          console.error("File upload failed", error);
        });
    }
  };
  return (
    <div className="you">
      <header>
        <nav>
          <section>
            <span>You</span>
            <Link to={"/account"}>
              <img src={userAccount} />
            </Link>
          </section>
          <p>Born on December 22, 1994 at 12:00 PM.</p>
        </nav>
        <nav>
          <span>Your core personality</span>
          <p>There are three key pillars to your personality</p>
        </nav>
      </header>
      <div className="core-personality">
        <div className="sun" onClick={() => navigate("/you/sun")}>
          <section className="img"></section>
          <section className="text">
            <span>Sun</span>
            <p>Your identity</p>
          </section>
        </div>
        <div className="moon" onClick={() => navigate("/you/moon")}>
          <section className="img"></section>
          <section className="text">
            <span>Moon</span>
            <p>Your emotions</p>
          </section>
        </div>
        <div className="ricing-sign" onClick={() => navigate("/you/ricing-sun")}>
          <section className="img"></section>
          <section className="text">
            <span>Ricing sign</span>
            <p>Your image</p>
          </section>
        </div>
      </div>
      <header style={{ marginTop: "20px" }}>
        <nav>
          <span>A little more about you</span>
          <p>Other important planetary placements.</p>
        </nav>
      </header>
      <div className="about-you">
        <div className="sun" onClick={() => navigate("/you/mercury")}>
          <section className="img"></section>
          <section className="text">
            <span>Mercury</span>
            <p>Your interaction</p>
          </section>
        </div>
        <div className="moon" onClick={() => navigate("/you/jupiter")}>
          <section className="img"></section>
          <section className="text">
            <span>Jupiter</span>
            <p>Your aspirations</p>
          </section>
        </div>
        <div className="ricing-sign" onClick={() => navigate("/you/midheaven")}>
          <section className="img"></section>
          <section className="text">
            <span>MidHeaven</span>
            <p>Your Fortune</p>
          </section>
        </div>
      </div>
      <div className="your-palmistry">
        <span>Your Palmistry</span>
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          onChange={(e) => sendPalmPhoto(e)}
          key={palmFile ? palmFile.name : ""}
        />
        <form>
          <label className="block" htmlFor="fileInput">
            <img src={palm} />
            <span>Get Your Palmistry Reading</span>
            <p>Find your happiness with highly-personalized predictions</p>
          </label>
        </form>
      </div>
    </div>
  );
};

export default You;
