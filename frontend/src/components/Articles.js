import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Articles.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import UserContext from "./userContext";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";

function Articles({ storage }) {
  const [articles, setArticles] = useState([
    {
      title: "",
      content: "",
      upvotes: 0,
      author: "",
    },
  ]);

  const { userData } = useContext(UserContext);

  console.log(userData);

  const history = useHistory();
  // if (userData === null || userData.token === undefined) {
  //   history.push("/login");
  // }

  async function handleDelete(id) {
    if (userData === null || userData.token === undefined) {
      history.push({
        pathname: "/login",
        currentLocation: "/articles",
      });
    } else {
      try {
        const deleteArticle = await axios.delete(`/articles/delete/${id}`, {
          headers: { "x-auth-token": userData.token },
        });
        console.log(deleteArticle);
        if (deleteArticle.status === 200) {
          fetch("/articles", {
            headers: { "x-auth-token": userData.token },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
            })
            .then((jsonRes) => setArticles(jsonRes));
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function handleUpvote(article) {
    if (userData === null || userData.token === undefined) {
      history.push({
        pathname: "/login",
        currentLocation: "/articles",
      });
    } else {
      const upvoteData = { article, userId: userData.user.id };
      const articlesResponse = await axios.put("/articles/upvote", upvoteData, {
        headers: { "x-auth-token": userData.token },
      });

      if (articlesResponse.data.status === 200) {
        fetch("/articles", {
          headers: { "x-auth-token": userData.token },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((jsonRes) => setArticles(jsonRes));
      }
    }
  }
  useEffect(() => {
    fetch("/articles")
      // {
      //   headers: { "x-auth-token": userData.token },
      // })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setArticles(jsonRes));
  }, []);
  console.log(articles);
  return (
    <div>
      {storage !== null ? (
        <div>
          <h1>Articles</h1>
          {articles
            .slice(0)
            .reverse()
            .map((article, key) => {
              const upvoteColor =
                article.upvotes &&
                article.upvotes.indexOf(userData.user?.id) > -1
                  ? "active"
                  : "primary";
              return (
                <div key={key} className="article-list-item">
                  <div className="articleHeader">
                    <div className="deleteP">
                      <h3 className="articleTitle">{article.title}</h3>
                      <DeleteIcon
                        className="deleteBtn"
                        onClick={() => {
                          handleDelete(article._id);
                        }}></DeleteIcon>
                    </div>
                    <div className="likes">
                      {article.upvotes.length} <span>likes</span>
                      <ThumbUpAltIcon
                        className={`thumbs-up ${upvoteColor}`}
                        onClick={() => handleUpvote(article)}></ThumbUpAltIcon>
                    </div>
                    <div>
                      <h5>{article.author}</h5>
                    </div>
                  </div>

                  <div className="deleteP">
                    <p>{article.content}</p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          {" "}
          <h1>Please login</h1>{" "}
        </div>
      )}
    </div>
  );
}

export default Articles;
