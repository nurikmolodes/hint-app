import { useNavigate } from "react-router-dom";
import "./SignIn.scss";
import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("success");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading("loading");
    // Send a POST request using Axios

    axios
      .post(
        `https://api.astropulse.app/api/auth`,
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then((response) => {
        console.log("Response:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        // navigate("/horoscope");
        window.location.replace("/horoscope");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading("error");
      });
  };
  return (
    <div className="sign-in">
      <h2>Fill in login and password that we've sent to your gmail</h2>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">
          {loading === "success"
            ? "Submit"
            : loading === "loading"
            ? "Loading"
            : loading === "error"
            ? "Error"
            : ""}
        </button>
        <span>{loading === "error" && "An Error occurred while trying sign in"}</span>
      </form>
    </div>
  );
};

export default SignIn;
