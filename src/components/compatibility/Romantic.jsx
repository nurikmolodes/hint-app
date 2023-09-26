import React from "react";
import "../../styles/Romantic.scss";
import lora from "../../assets/lora.svg";
import daniel from "../../assets/daniel.svg";
import threeHearts from "../../assets/threeHearts.svg";
import share from "../../assets/shareScore.svg";
import basic from "../../assets/basic.svg";
import emotion from "../../assets/emotion.svg";

const Romantic = () => {
  const characteristics = [
    {
      title: "Basic Identities",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      img: basic,
      titleColor: "#E48D21",
    },
    {
      title: "Emotional Styles",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      img: emotion,
      titleColor: "#5480F0",
    },
  ];
  return (
    <div className="romantic">
      <div className="match">
        <div className="users">
          <div className="user">
            <img src={daniel} />
            <span>Daniel</span>
          </div>
          <div class="progress-bar">
            <img src={threeHearts} />
          </div>
          <div className="user">
            <img src={lora} />
            <span>Lora</span>
          </div>
        </div>
        <div className="share">
          <img src={share} />
        </div>
      </div>
      <div className="characteristics">
        {characteristics.map((item, i) => (
          <div className="characteristic" style={{ background: `url(${item.img})` }}>
            <h3 style={{ color: `${item.titleColor}` }}>{item.title}</h3>
            <p>{item.content}</p>
            <span>Read More</span>
          </div>
        ))}
      </div>
      <div className="button">
        <button>Save Report</button>
      </div>
    </div>
  );
};

export default Romantic;
