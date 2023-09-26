import React from "react";
import { useNavigate } from "react-router-dom";
import lora from "../../assets/lora.svg";
import daniel from "../../assets/daniel.svg";
import threeHearts from "../../assets/threeStars.svg";
import share from "../../assets/shareScore.svg";
import basic from "../../assets/basic.svg";
import emotion from "../../assets/emotion.svg";
import "../../styles/Friendship.scss";

const Friendship = () => {
  const characteristics = [
    {
      id: 1,
      title: "Basic Identities",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      img: basic,
      titleColor: "#E48D21",
    },
    {
      id: 2,
      title: "Emotional Styles",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
      img: emotion,
      titleColor: "#5480F0",
    },
  ];
  const navigate = useNavigate();

  const navigateToAnotherPage = (id) => {
    navigate(`/${id}`);
  };
  return (
    <div className="friendship">
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
          <div key={item.id} className="characteristic" style={{ background: `url(${item.img})` }}>
            <h3 style={{ color: `${item.titleColor}` }}>{item.title}</h3>
            <p>{item.content}</p>
            <span onClick={() => navigateToAnotherPage(item.id)}>Read More</span>
          </div>
        ))}
      </div>
      <div className="button">
        <button>Save Report</button>
      </div>
    </div>
  );
};

export default Friendship;
