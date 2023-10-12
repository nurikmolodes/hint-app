import React, { useEffect, useState } from "react";
import "./ResultsCompatibility.scss";
import back from "../../../assets/back.svg";
import { Link, useNavigate } from "react-router-dom";
import ActiveRomantic from "../../../assets/ActiveRomantic.svg";
import ActiveFriendship from "../../../assets/ActiveFriendship.svg";
import InActiveRomantic from "../../../assets/inActiveRomantic.svg";
import InActiveFriendship from "../../../assets/InActiveFriendship.svg";
import Romantic from "../../../components/compatibility/Romantic";
import Friendship from "../../../components/compatibility/Friendship";

const ResultsCompatibility = ({ match, user }) => {
  console.log(match);
  const navigate = useNavigate();
  const [options, setOptions] = useState([
    {
      id: 1,
      text: "Romantic",
      active: true,
      activeImg: ActiveRomantic,
      inActiveImg: InActiveRomantic,
    },
    {
      id: 2,
      text: "Friendship",
      active: false,
      activeImg: ActiveFriendship,
      inActiveImg: InActiveFriendship,
    },
  ]);
  const option = options.filter((a) => a?.active === true)[0]?.text;
  console.log(option);

  const handleOptionClick = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      active: i === index,
    }));
    setOptions(updatedOptions);
  };

  return (
    <div className="resultsCompatibility">
      <header>
        <div className="back">
          <Link onClick={() => navigate(-1)}>
            <img src={back} />
          </Link>
        </div>
      </header>
      <div className="option-buttons">
        {options.map((option, index) => (
          <button
            key={index}
            className={option.active ? "active" : ""}
            onClick={() => handleOptionClick(index)}>
            <img src={option.active ? option.activeImg : option.inActiveImg} />
            <span>{option.text}</span>
          </button>
        ))}
      </div>
      {option === "Romantic" ? (
        <Romantic user={user} match={match} />
      ) : (
        <Friendship user={user} match={match} />
      )}
    </div>
  );
};

export default ResultsCompatibility;
