import React from "react";
import "./DetailCharacteristic.scss";
import { Link } from "react-router-dom";
import back from "../../../assets/back.svg";
import share from "../../../assets/share.svg";

const DetailCharacteristic = () => {
  return (
    <div className="detail-characteristic">
      <header>
        <div className="back">
          <Link to={"/"}>
            <img src={back} />
          </Link>
        </div>
      </header>
      <div className="basic-identities">
        <h3>Basic Identities</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since.Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since.
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
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since.</li>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li> Lorem Ipsum has been the industry's standard dummy text ever since.</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailCharacteristic;
