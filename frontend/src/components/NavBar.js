import React, { useState, useEffect, useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import UserContext from "./userContext";

function NavBar({ handleLogout, storage }) {
  //  const xyz = xyz.userData;
  //destructuring
  const { userData, setUserData } = useContext(UserContext);
  const [flagLogout, setFlagLogout] = useState(false);
  console.log(flagLogout);
  useEffect(() => {
    if (userData === null || userData.token === undefined) {
      setFlagLogout(false);
    } else {
      setFlagLogout(true);
    }
  }, [userData]);
  console.log("ud from nav", userData);
  console.log(flagLogout);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link className="title" to="/">
              WriteUP
            </Link>
          </li>

          <li>
            <Link to="/articles">Articles</Link>
          </li>

          <li>
            <Link to="/new-article">New Article</Link>
          </li>
          <li>{!flagLogout ? <Link to="/login">Login</Link> : <></>}</li>
          <li>{!flagLogout ? <Link to="/register">Register</Link> : <></>}</li>
          <li>
            {flagLogout ? <Link onClick={handleLogout}>Logout</Link> : <></>}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
