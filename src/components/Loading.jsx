import React, { useEffect } from "react";
import "../styles/Loading.scss";

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="loading">
      <p>Creating the report</p>
    </div>
  );
};

export default Loading;
