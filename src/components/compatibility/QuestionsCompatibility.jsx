import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import together from "../../assets/together.svg";
import love from "../../assets/love.svg";
import bond from "../../assets/bond.svg";

const Questions = () => {
  const navigate = useNavigate(); // Initialize history
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      title: "Test compatibiluty in love and friendship",
      img: together,
      content:
        "We’ve got all the intel on your relationships with friends, romantic partners and crusher. Discover what both of you really need and learn how to strengthen your bond",
    },
    {
      title: "Test compatibiluty in love and friendship",
      img: love,
      content:
        "We’ve got all the intel on your relationships with friends, romantic partners and crusher. Discover what both of you really need and learn how to strengthen your bond",
    },
    {
      title: "Test compatibiluty in love and friendship",
      img: bond,
      content:
        "We’ve got all the intel on your relationships with friends, romantic partners and crusher. Discover what both of you really need and learn how to strengthen your bond",
    },
  ];
  const handleAgreeClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Redirect to another page when all questions are answered
      navigate("/addfriend"); // Change '/another-page' to the desired URL
    }
  };

  return (
    <div className="questions">
      <div className="image">
        <img src={questions[currentQuestionIndex].img} />
      </div>
      <h3>{questions[currentQuestionIndex].title}</h3>
      <p>{questions[currentQuestionIndex].content}</p>
      <div className="progress-dots">
        {questions.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentQuestionIndex ? "active" : ""}`}></span>
        ))}
      </div>
      <button onClick={handleAgreeClick}>Add friend</button>
    </div>
  );
};

export default Questions;
