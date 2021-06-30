import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "./userContext";
import ErrorNotice from "./ErrorNotice";
import GoogleLogin from "react-google-login";
import { useLocation } from "react-router-dom";
import "./Login.css";

function Login({ setStorage }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const location = useLocation();

  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:3002/users/googlelogin",
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log("Google Login Success", response);
    });
  };
  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginResponse = await axios.post(
        "http://localhost:3002/users/login",
        loginUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      setStorage(loginResponse.data.token);
      if (location.currentLocation === "/articles") history.push("/articles");
      else if (location.currentLocation === "/new-article") {
        history.push("/new-article");
      } else history.push("/");
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
      console.log(err.message);
    }
  };
  return (
    <div className="Login">
      <h2>Login</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={submit}>
        <label>Email: </label>
        <input
          placeholder="example@xyz.com"
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password: </label>
        <input
          placeholder="password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <GoogleLogin
          clientId="208216107105-1fd52oede58cm2sbgp7okp3s0f7gojkb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseSuccessGoogle}
          onFailure={responseFailureGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <button title="login" type="submit" value="Login">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
