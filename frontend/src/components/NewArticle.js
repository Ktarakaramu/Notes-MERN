import React, { useState, useContext, useEffect } from "react";
import "./NewArticle.css";
import axios from "axios";
import UserContext from "./userContext";
import { useHistory } from "react-router-dom";

function NewArticle() {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  console.log("user data", userData);

  //middleware
  if (userData.token === undefined) {
    history.push({
      pathname: "/login",
      currentLocation: "/new-article",
    });
  }

  //checking user logged in or not
  useEffect(() => {
    // if (userData.token === undefined) {
    //   history.push("/login");
    // }
  }, []);

  function handleChange(event) {
    // console.log(event.target);
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    // setInput(event.target.value);
  }

  async function handleClick(event) {
    event.preventDefault();
    const newArticle = {
      title: input.title,
      content: input.content,
    };
    console.log(input);
    const articlesResponse = await axios.post(
      "http://localhost:3002/articles/create",
      newArticle,
      {
        headers: { "x-auth-token": userData.token },
      }
    );
    if (articlesResponse.data.status === 200) {
      alert("Article created successfully");
      history.push("/articles");
    } else {
      alert("Error occured while creating article");
    }
  }
  return (
    <div>
      {/* <form>
        <label>Article Title</label>
        <input type="text" value={input.title} onChange={handleChange}></input>
        <label>Content</label>
        <textarea onChange={handleChange} value={input.content}></textarea>
        <button className="button"  onClick={handleClick}>
          Post Article
        </button>
      </form> */}
      <form className="newArticle">
        <h1>Create New Article</h1>
        <label>Article Title</label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={handleChange}></input>
        <label>Content</label>
        <textarea
          onChange={handleChange}
          name="content"
          value={input.content}></textarea>
        <button title="postarticle" className="button" onClick={handleClick}>
          Post Article
        </button>
      </form>
    </div>
  );
}

export default NewArticle;
