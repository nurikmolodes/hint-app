import React, { useEffect } from "react";
import "./PalmResults.scss";
import palm from "../../../assets/palm.svg";
import { Link, useNavigate } from "react-router-dom";

const PalmResults = ({ resultsPalm }) => {
  console.log(resultsPalm);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="palm-results">
      <header>
        <span className="title">Your Palmistry</span>
        <img src={palm} />
        <span className="subtitle">Palmistry Reading Complete</span>
        <p>Get your Palmistry Reading Uncovered by our team of Professional Astrologers</p>
      </header>
      <section>
        <button>Get It Now</button>
        <span onClick={() => navigate(-1)}>Maybe Later</span>
        <span onClick={() => navigate(-1)}>Retake Photo</span>
      </section>
    </div>
  );
};

export default PalmResults;
