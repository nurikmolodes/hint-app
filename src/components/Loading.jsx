import React, { useEffect } from "react";
import "../styles/Loading.scss";
import Lottie from "lottie-react";
import animationIpad from "../assets/ipad.json";
import animationIphone from "../assets/iphone.json";

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="loading">
      <span>Creating the report</span>
      <Lottie
        animationData={window.innerWidth > 500 ? animationIpad : animationIphone} // JSON данные анимации
        loop={true} // Повторять ли анимацию
        autoplay={true} // Автоматически ли проигрывать анимацию
      />
    </div>
  );
};

export default Loading;
