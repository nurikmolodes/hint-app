import React from "react";
import "../styles/components/Navigator.scss";
import { Link, useLocation } from "react-router-dom";
import horoscopeActive from "../assets/horoscopeActive.svg";
import horoscopeInactive from "../assets/horoscopeInactive.svg";
import compatibilityActive from "../assets/compatibilityActive.svg";
import compatibilityInactive from "../assets/compatibilityInactive.svg";
import youActive from "../assets/youActive.svg";
import youInactive from "../assets/youInactive.svg";
import guidanceActive from "../assets/guidanceActive.svg";
import guidanceInactive from "../assets/guidanceInactive.svg";



const Navigator = () => {
  // Routes
  const routes = [
    {
      id: 1,
      name: "Horoscope",
      link: "horoscope",
      activeImage: horoscopeActive,
      inActiveImage: horoscopeInactive,
      active: true,
    },
    {
      id: 2,
      name: "Compatibility",
      link: "compatibility",
      activeImage: compatibilityActive,
      inActiveImage: compatibilityInactive,
      active: false,
    },
    {
      id: 3,
      name: "You",
      link: "you",
      activeImage: youActive,
      inActiveImage: youInactive,
      active: false,
    },
    {
      id: 4,
      name: "Guidance",
      link: "guidance",
      activeImage: guidanceActive,
      inActiveImage: guidanceInactive,
      active: false,
    },
  ];

  // Update the active property dynamically based on the current route
  const location = useLocation();
  const updatedRoutes = routes.map((route) => ({
    ...route,
    active: `/${route.link}` === location.pathname,
  }));
  return (
    <div className="sticky-footer">
      <ul>
        {updatedRoutes.map((route) => (
          <Link to={route.link} key={route.id}>
            <li>
              {" "}
              {route.active ? <img src={route.activeImage} /> : <img src={route.inActiveImage} />}
              <a>{route.name}</a>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navigator;
