const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");
const User = require("../models/userModel");
const config = require("../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//creating new article
router.route("/create").post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const token = req.header("x-auth-token");
  try {
    if (!token)
      return res.status(401).json({ error: "No authentication token" });
    const verified = jwt.verify(token, config.secret);
    if (!verified) return res.status(401).json({ error: "Un authorized" });
    const newArticle = new Article({
      title,
      content,
    });
    newArticle.save();
    res.json({ status: 200, ok: true, id: newArticle._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/").get((req, res) => {
  // const token = req.header("x-auth-token");
  // try {
  //   if (!token) return res.status(401).json({ error: "No authentication token" });
  //   const verified = jwt.verify(token, config.secret);
  //   if (!verified) return res.status(401).json({ error: "Un authorized" });
  //   Article.find().then((foundArticles) => res.json(foundArticles));
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
  Article.find().then((foundArticles) => res.json(foundArticles));
});

router.route("/login").get((req, res) => {
  res.send({
    token: "test123",
  });
});
//delete using then and catch
// router.route("delete/:id").delete((req, res) => {
//   Article.findByIdAndDelete(req.params.id)
//     .then((deletedArticle) => res.status(200).json(deletedArticle))
//     .catch((err) => res.json({ status: err.message, code: 404 }));
// });

//delete using async and await
router.route("/delete/:id").delete(async (req, res) => {
  console.log(req.params.id);
  const token = req.header("x-auth-token");
  try {
    if (!token)
      return res.status(401).json({ error: "No authentication token" });
    const verified = jwt.verify(token, config.secret);
    if (!verified) return res.status(401).json({ error: "Un authorized" });
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    res.status(200).json(deletedArticle);
  } catch (err) {
    res.json({ status: err.message, code: 404 });
  }
});

//upvoting single article endpoint
router.route("/upvote").put((req, res) => {
  const articleFromQuery = req.body.article;
  const userId = req.body.userId;
  const token = req.header("x-auth-token");
  try {
    if (!token)
      return res.status(401).json({ error: "No authentication token" });
    const verified = jwt.verify(token, config.secret);
    if (!verified) return res.status(401).json({ error: "Un authorized" });
    Article.findById(articleFromQuery._id).then((article) => {
      let updatedUpvotes = [];
      if (article.upvotes.indexOf(userId) > -1) {
        updatedUpvotes = article.upvotes.filter((upvote) => {
          return upvote !== userId;
        });

        const updatedArticle = { ...articleFromQuery, upvotes: updatedUpvotes };

        Article.findByIdAndUpdate(article._id, updatedArticle, { new: true })
          .then((err, response) => {
            console.log(response);
            res.json({ status: 200, ok: true });
          })
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        articleFromQuery.upvotes.push(userId);

        Article.findByIdAndUpdate(article._id, articleFromQuery, { new: true })
          .then((err, response) => {
            console.log(response);
            res.json({ status: 200, ok: true });
          })
          .catch((err) => res.status(400).json("Error: " + err));
      }
    });
  } catch (err) {
    res.json({ status: err.message, code: 404 });
  }
});

module.exports = router;
