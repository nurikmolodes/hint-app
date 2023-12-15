import React, { useState } from "react";
import "./Account.scss";
import back from "../../../assets/back.svg";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../../assets/userIcon.svg";
import openBlock from "../../../assets/open.svg";

const Account = ({ user }) => {
  const navigate = useNavigate();
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
      title: "Contact Support.",
      content:
        "If you have any questions feel free to contact our support department: info@astropulse.app",
      line: true,
    },
    {
      title: "Privacy policy",
      // content:
      //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ipsam cum? Aspernatur harum consectetur nam fuga natus rem. Deleniti, aperiam et excepturi soluta cupiditate ab exercitationem necessitatibus itaque nesciunt officia.",
      line: true,
      link: "https://appmediaco.com/Policy.html",
    },
    {
      title: "EULA",
      // content:
      //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ipsam cum? Aspernatur harum consectetur nam fuga natus rem. Deleniti, aperiam et excepturi soluta cupiditate ab exercitationem necessitatibus itaque nesciunt officia.",
      line: false,
      link: "https://appmediaco.com/Terms.html",
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
      <Link to={"/userupdate"}>
        <section className="user">
          <div className="left">
            <img src={userIcon} />
            <span>{user?.info?.name}</span>
          </div>
          <img src={openBlock} />
        </section>
      </Link>
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
              <a className="accordion-title" href={item.link} target="_blank">
                <span>{item.title}</span>
                <img src={openBlock} />
              </a>
              {0 === activeIndex2 && <div className="accordion-content">{item.content}</div>}
              {item.line ? <div className="line"></div> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Account;
