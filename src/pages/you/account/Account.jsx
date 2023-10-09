import React, { useState } from "react";
import "./Account.scss";
import back from "../../../assets/back.svg";
import { Link } from "react-router-dom";
import userIcon from "../../../assets/userIcon.svg";
import openBlock from "../../../assets/open.svg";

const Account = () => {
  const data = [
    {
      title: "Account management",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, accusamus quasi! Quasi, asperiores doloremque consequatur natus laboriosam consectetur ratione unde veritatis non, libero suscipit. Eum repellendus exercitationem fuga cum sint!",
      line: true,
    },
    {
      title: "Cancel mobile subscription",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ipsam cum? Aspernatur harum consectetur nam fuga natus rem. Deleniti, aperiam et excepturi soluta cupiditate ab exercitationem necessitatibus itaque nesciunt officia.",
      line: false,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const data2 = [
    {
      title: "Desk Help",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, accusamus quasi! Quasi, asperiores doloremque consequatur natus laboriosam consectetur ratione unde veritatis non, libero suscipit. Eum repellendus exercitationem fuga cum sint!",
      line: true,
    },
    {
      title: "Privacy policy",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ipsam cum? Aspernatur harum consectetur nam fuga natus rem. Deleniti, aperiam et excepturi soluta cupiditate ab exercitationem necessitatibus itaque nesciunt officia.",
      line: true,
    },
    {
      title: "EULA",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ipsam cum? Aspernatur harum consectetur nam fuga natus rem. Deleniti, aperiam et excepturi soluta cupiditate ab exercitationem necessitatibus itaque nesciunt officia.",
      line: false,
    },
  ];
  const [activeIndex2, setActiveIndex2] = useState(null);

  const handleClick2 = (index) => {
    if (index === activeIndex2) {
      setActiveIndex2(null);
    } else {
      setActiveIndex2(index);
    }
  };
  return (
    <div className="account">
      <header>
        <div className="back">
          <Link onClick={() => navigate(-1)}>
            <img src={back} />
          </Link>
        </div>
      </header>
      <section className="user">
        <div className="left">
          <img src={userIcon} />
          <span>Lora</span>
        </div>
        <img src={openBlock} />
      </section>
      <section className="first">
        <div className="accordion">
          {data.map((item, index) => (
            <div
              key={index}
              className={`accordion-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleClick(index)}>
              <div className="accordion-title">
                <span>{item.title}</span>
                <img src={openBlock} />
              </div>
              {index === activeIndex && <div className="accordion-content">{item.content}</div>}
              {item.line ? <div className="line"></div> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="second">
        <div className="accordion">
          {data2.map((item, index) => (
            <div
              key={index}
              className={`accordion-item ${index === activeIndex2 ? "active" : ""}`}
              onClick={() => handleClick2(index)}>
              <div className="accordion-title">
                <span>{item.title}</span>
                <img src={openBlock} />
              </div>
              {index === activeIndex2 && <div className="accordion-content">{item.content}</div>}
              {item.line ? <div className="line"></div> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Account;
