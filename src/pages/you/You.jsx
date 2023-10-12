import React, { useState } from "react";
import "./You.scss";
import userAccount from "../../assets/userAccount.svg";
import palm from "../../assets/palm.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const You = ({ setResultsPalm, user }) => {
  const navigate = useNavigate();
  const [palmFile, setPalmFile] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const sendPalmPhoto = (e) => {
    const file = e.target.files[0];
    setPalmFile(file);
    if (file) {
      setLoading(true);
      const response = axios
        .post(
          "https://api.astropulse.app/api/read-palm",
          { image: file },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          },
        )
        .then((response) => {
          setResultsPalm(response.data);
          setLoading(false);
          navigate("/palmresults");
        })
        .catch((error) => {
          console.error("File upload failed", error);
          setLoading(false);
          alert("Please upload your palm hand and maximum image size 500kb");
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
        <div className="sun" onClick={() => navigate("/you/Sun")}>
          <section className="img"></section>
          <section className="text">
            <span>Sun</span>
            <p>Your identity</p>
          </section>
        </div>
        <div className="moon" onClick={() => navigate("/you/Moon")}>
          <section className="img"></section>
          <section className="text">
            <span>Moon</span>
            <p>Your emotions</p>
          </section>
        </div>
        <div className="ricing-sign" onClick={() => navigate("/you/Venus")}>
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
        <div className="sun" onClick={() => navigate("/you/Mercury")}>
          <section className="img"></section>
          <section className="text">
            <span>Mercury</span>
            <p>Your interaction</p>
          </section>
        </div>
        <div className="moon" onClick={() => navigate("/you/Jupiter")}>
          <section className="img"></section>
          <section className="text">
            <span>Jupiter</span>
            <p>Your aspirations</p>
          </section>
        </div>
        <div className="ricing-sign" onClick={() => navigate("/you/Mars")}>
          <section className="img"></section>
          <section className="text">
            <span>MidHeaven</span>
            <p>Your Fortune</p>
          </section>
        </div>
      </div>
      <div className="your-palmistry">
        <span>Your Palmistry</span>
        {loading ? (
          <Box sx={{ width: "100%", height: "200px" }}>
            <LinearProgress sx={{ marginTop: "100px" }} />
          </Box>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default You;
