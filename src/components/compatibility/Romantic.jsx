import React from "react";
import "../../styles/Romantic.scss";
import lora from "../../assets/lora.svg";
import daniel from "../../assets/daniel.svg";

const Romantic = () => {
  return (
    <div className="romantic">
      <div className="match">
        <div className="users">
          <div className="user">
            <img src={daniel} />
            <span>Daniel</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar">
              <div class="progress-bar-fill"></div>
            </div>
          </div>
          <div className="user">
            <img src={lora} />
            <span>Lora</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Romantic;
