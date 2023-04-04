const express = require("express");
const path = require("path");
const router = express.Router();
const data = {
  title: "Popüler Kurslar",
  categories: [
    "Web Geliştirme",
    "Programlama",
    "Mobil Uygulamalar",
    "Veri Analizi",
    "Ofis Uygulamaları",
  ],
  blogs: [
    {
      blogId: 1,
      blog_title: "Komple Uygulamalı Web Geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "1.jpeg",
      anasayfa : true,
      onay : false
    },
    {
      blogId: 2,
      blog_title: "Python ile Web Geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "2.jpeg",
      anasayfa : true,
      onay : true
    },
    {
      blogId:3,
      blog_title: "Bir şeyler ile web geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "3.jpeg",
      anasayfa : false,
      onay : true
    },
    {
      blogId:4,
      blog_title: "Bir şeyler ile web geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "3.jpeg",
      anasayfa : false,
      onay : true
    },
    {
      blogId:5,
      blog_title: "Bir şeyler ile web geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "3.jpeg",
      anasayfa : false,
      onay : true
    },
  ],
};

router.use("/blogs/:blog_id", (req, res, next) => {
  /*   res.sendFile(path.join(__dirname, "../views/users", "blogs-detail.html")); */
  res.render("./users/blogs-detail");
});

router.use("/blogs", (req, res, next) => {
  /*  res.sendFile(path.join(__dirname, "../views/users", "blogs.html")); */
  res.render("./users/blogs", data);
});

router.use("/", (req, res, next) => {
  /*   res.sendFile(path.join(__dirname, "../views/users", "index.html")); */
  res.render("./users/index", data);
});

module.exports = router;
