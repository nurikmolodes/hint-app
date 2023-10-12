import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};
export default Auth;
