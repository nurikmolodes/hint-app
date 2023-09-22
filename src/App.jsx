import "../src/styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Compatibility from "./pages/compatibility/Compatibility";
import Horoscope from "./pages/Horoscope";
import Navigator from "./components/Navigator";
import You from "./pages/You";
import Guidance from "./pages/Guidance";

function App() {
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
  ];
  return (
    <Router>
      <div className="wrapper">
        <div className="content">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} exact element={route.component} />
            ))}
          </Routes>
        </div>
        <Navigator />
      </div>
    </Router>
  );
}

export default App;
