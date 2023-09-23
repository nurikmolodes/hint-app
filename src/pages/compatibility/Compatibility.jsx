import React from "react";
import QuestionsCompatibility from "../../components/compatibility/QuestionsCompatibility";
import "./Compatibilty.scss";

const Compatibility = () => {
  return (
    <div className="compatibility">
      <div className="content">
        <QuestionsCompatibility />
      </div>
    </div>
  );
};

export default Compatibility;
