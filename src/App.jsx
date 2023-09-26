import "../src/styles/App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Compatibility from "./pages/compatibility/Compatibility";
import Horoscope from "./pages/Horoscope";
import Navigator from "./components/Navigator";
import You from "./pages/You";
import Guidance from "./pages/Guidance";
import AddFriend from "./pages/compatibility/addFriend/AddFriend";
import ResultsCompatibilty from "./pages/compatibility/resultsCompatibilty/ResultsCompatibility";
import { useState } from "react";

function App() {
  const location = useLocation();
  const footerRoutes = ["/", "/compatibility", "/horoscope", "/you", "guidance"];
  // Check if the current pathname is in the navbarRoutes array
  const shouldDisplayNavbar = footerRoutes.includes(location.pathname);

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
      component: <AddFriend  />,
      label: "Add Friend",
    },
    {
      path: "/resultsCompatibility",
      component: <ResultsCompatibilty />,
      label: "Results Compatibilty",
    },
  ];
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
