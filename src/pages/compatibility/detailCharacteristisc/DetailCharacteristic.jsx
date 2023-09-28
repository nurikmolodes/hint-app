import React, { useEffect } from "react";
import "./DetailCharacteristic.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import back from "../../../assets/back.svg";
import share from "../../../assets/share.svg";

const DetailCharacteristic = ({ match }) => {
  const { CharacteristicId } = useParams();
  console.log(CharacteristicId);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="detail-characteristic">
      <header>
        <div className="back">
          <Link onClick={() => navigate(-1)}>
            <img src={back} />
          </Link>
        </div>
      </header>
      <div className="basic-identities">
        <h3>Basic Identities</h3>
        <p>
          {CharacteristicId === "basic-romantic" && match?.love_report?.slice(0, 4).map((a) => a)}
          {CharacteristicId === "emotional-romantic" && match?.love_report?.slice(3).map((a) => a)}
          {CharacteristicId === "basic-friend" &&
            match?.friendship_report?.slice(0, 4).map((a) => a)}
          {CharacteristicId === "emotion-friend" &&
            match?.friendship_report?.slice(4).map((a) => a)}
        </p>
        <div className="duo">
          <div className="first">
            <div className="zodiac">
              <h4>Lora</h4>
              <button>Twins</button>
            </div>
            <p>Lorem Ipsum is simply dummy text.</p>
          </div>
          <div className="second">
            <div className="zodiac">
              <h4>Daniel</h4>
              <button>Lion</button>
            </div>
            <p>Lorem Ipsum is simply dummy text.</p>
          </div>
        </div>
        <div className="share">
          <img src={share} />
        </div>
      </div>
      <div className="pros">
        <div className="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none">
            <path
              d="M10 3C10 7.14213 13.3578 10.5 17.5 10.5C13.3578 10.5 10 13.8578 10 18C10 13.8578 6.64213 10.5 2.5 10.5C6.64213 10.5 10 7.14213 10 3Z"
              fill="#E48D21"
            />
          </svg>
          <h5>Pros</h5>
        </div>
        <ul>
          <li>{match?.compatibility_report}</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailCharacteristic;
