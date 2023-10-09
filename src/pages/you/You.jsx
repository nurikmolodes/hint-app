import React from "react";
import "./You.scss";
import userAccount from "../../assets/userAccount.svg";

const You = () => {
  return (
    <div className="you">
      <header>
        <nav>
          <section>
            <span>You</span>
            <img src={userAccount} />
          </section>
          <p>Born on December 22, 1994 at 12:00 PM.</p>
        </nav>
        <nav>
          <span>Your core personality</span>
          <p>There are three key pillars to your personality</p>
        </nav>
      </header>
      <div className="core-personality">
        <div className="sun">
          <section className="img"></section>
          <section className="text">
            <span>Sun</span>
            <p>Your identity</p>
          </section>
        </div>
        <div className="moon">
          <section className="img"></section>
          <section className="text">
            <span>Moon</span>
            <p>Your emotions</p>
          </section>
        </div>
        <div className="ricing-sign">
          <section className="img"></section>
          <section className="text">
            <span>Sun</span>
            <p>Your image</p>
          </section>
        </div>
      </div>
      <header style={{ marginTop: '20px' }}>
        <nav>
          <span>A little more about you</span>
          <p>Other important planetary placements.</p>
        </nav>
      </header>
      <div className="about-you">
        <div className="sun">
          <section className="img"></section>
          <section className="text">
            <span>Sun</span>
            <p>Your interaction</p>
          </section>
        </div>
        <div className="moon">
          <section className="img"></section>
          <section className="text">
            <span>Moon</span>
            <p>Your aspirations</p>
          </section>
        </div>
        <div className="ricing-sign">
          <section className="img"></section>
          <section className="text">
            <span>Sun</span>
            <p>Your Fortune</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default You;
