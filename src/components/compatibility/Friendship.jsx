import React from "react";
import { useNavigate } from "react-router-dom";
import lora from "../../assets/lora.svg";
import daniel from "../../assets/daniel.svg";
import threeHearts from "../../assets/threeStars.svg";
import share from "../../assets/shareScore.svg";
import basic from "../../assets/basic.svg";
import emotion from "../../assets/emotion.svg";
import "../../styles/Friendship.scss";

const Friendship = ({ match }) => {
  const characteristics = [
    {
      id: 'basic-friend',
      title: "Basic Identities",
      content: match.friendship_report[0].slice(0, 165) + "..." || "",
      img: basic,
      titleColor: "#E48D21",
    },
    {
      id: 'emotion-friend',
      title: "Emotional Styles",
      content: match.friendship_report[4].slice(0, 165) + "..." || "",
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
          <div
            class="progress-bar"
            style={{
              background: `radial-gradient(closest-side, #fff1f3 79%, transparent 80% 100%), conic-gradient(#ffe447 ${match?.compatibility_percentage}%, #fff1f3 0)`,
            }}>
            {match?.compatibility_percentage}%
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
