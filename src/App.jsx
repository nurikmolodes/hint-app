import "../src/styles/App.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Compatibility from "./pages/compatibility/Compatibility";
import Horoscope from "./pages/horoscope/Horoscope";
import Navigator from "./components/Navigator";
import You from "./pages/you/You";
import Guidance from "./pages/guidance/Guidance";
import AddFriend from "./pages/compatibility/addFriend/AddFriend";
import ResultsCompatibilty from "./pages/compatibility/resultsCompatibilty/ResultsCompatibility";
import { useEffect, useState } from "react";
import DetailCharacteristic from "./pages/compatibility/detailCharacteristisc/DetailCharacteristic";
import axios from "axios";

function App() {
  // Check if the current pathname is in the navbarRoutes array
  const navigate = useNavigate();
  const location = useLocation();
  const footerRoutes = ["/", "/compatibility", "/horoscope", "/you", "/guidance"];
  const shouldDisplayNavbar = footerRoutes.includes(location.pathname);
  const [match, setMatch] = useState([]);
  const getTheResultsCompatibility = (data) => {
    console.log(data);
    setMatch(data);
  };
  console.log(match);

  const routes = [
    {
      path: "/compatibility",
      component: <Compatibility />,
      label: "Compatibily",
    },
    {
      path: "/horoscope",
      component: <Horoscope />,
      label: "Horoscope",
    },
    {
      path: "/you",
      component: <You />,
      label: "You",
    },
    {
      path: "/guidance",
      component: <Guidance />,
      label: "Guidance",
    },
    {
      path: "/addfriend",
      component: <AddFriend getTheResultsCompatibility={getTheResultsCompatibility} />,
      label: "Add Friend",
    },
    {
      path: "/resultsCompatibility",
      component: <ResultsCompatibilty match={match} />,
      label: "Results Compatibilty",
    },
    {
      path: "/:CharacteristicId",
      component: <DetailCharacteristic match={match} />,
      label: "Characteristic",
    },
  ];
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/horoscope");
    }
  }, []);
  return (
    <div className="wrapper">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact element={route.component} />
        ))}
      </Routes>
      {shouldDisplayNavbar && <Navigator />}
    </div>
  );
}

export default App;
