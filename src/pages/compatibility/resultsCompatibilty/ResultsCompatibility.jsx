import React, { useState } from "react";
import "./ResultsCompatibility.scss";
import back from "../../../assets/back.svg";
import { Link } from "react-router-dom";
import ActiveRomantic from "../../../assets/ActiveRomantic.svg";
import ActiveFriendship from "../../../assets/ActiveFriendship.svg";
import InActiveRomantic from "../../../assets/inActiveRomantic.svg";
import InActiveFriendship from "../../../assets/InActiveFriendship.svg";
import Romantic from "../../../components/compatibility/Romantic";
import Friendship from "../../../components/compatibility/Friendship";

const ResultsCompatibility = () => {
  const [options, setOptions] = useState([
    {
      text: "Romantic",
      active: true,
      activeImg: ActiveRomantic,
      inActiveImg: InActiveRomantic,
    },
    {
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
          <Link to={"/"}>
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
      {option === "Romantic" ? <Romantic /> : <Friendship />}
    </div>
  );
};

export default ResultsCompatibility;
