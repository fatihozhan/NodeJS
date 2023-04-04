const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/blogs/:blog_id", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/users", "blogs-detail.html"));
});


router.use("/blogs", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/users", "blogs.html"));
});


router.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/users", "index.html"));
});

module.exports = router;
