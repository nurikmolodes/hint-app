import React from "react";
import "./Guidance.scss";
import Chat from "../../components/guidance/Chat";

const Guidance = ({ user }) => {
  return (
    <div className="guidance">
      <Chat user={user} />
    </div>
  );
};

export default Guidance;
