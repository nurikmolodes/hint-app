import "../src/styles/App.scss";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Compatibility from "./pages/compatibility/Compatibility";
import Horoscope from "./pages/Horoscope";
import Navigator from "./components/Navigator";
import You from "./pages/You";
import Guidance from "./pages/Guidance";
import AddFriend from "./pages/addFriend/AddFriend";
import { useState } from "react";

function App() {
  const [path, setPath] = useState('')
  const getTheUrl = (url) => {
    setPath(prev => prev = url)
  };
  console.log(path);

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
      component: <AddFriend getTheUrl={getTheUrl} />,
      label: "Add Friend",
    },
  ];
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact element={route.component} />
          ))}
        </Routes>
        {path === '/addfriend' ? null : <Navigator />}
      </div>
    </Router>
  );
}

export default App;
