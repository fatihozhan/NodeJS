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
      anasayfa: true,
      onay: false,
    },
    {
      blogId: 2,
      blog_title: "Python ile Web Geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "2.jpeg",
      anasayfa: true,
      onay: true,
    },
    {
      blogId: 3,
      blog_title: "Bir şeyler ile web geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "3.jpeg",
      anasayfa: false,
      onay: true,
    },
    {
      blogId: 4,
      blog_title: "Bir şeyler ile web geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "3.jpeg",
      anasayfa: false,
      onay: true,
    },
    {
      blogId: 5,
      blog_title: "Bir şeyler ile web geliştirme",
      blog_desc: "Lorem Ipsum Doler Set",
      blog_img: "3.jpeg",
      anasayfa: false,
      onay: true,
    },
  ],
};
const db = require("../data/db");

router.use("/blogs/category/:categoryid", async (req, res, next) => {
  try {
    const catId = req.params.categoryid;
    const [blog] = await db.execute("select * from blog where categoryid = ?", [
      catId,
    ]);
    const categories = await db.execute("select * from category");
    res.render("./users/blogs", {
      title: "Tüm Kurslar",
      blogs: blog,
      categories: categories[0],
      selectedCategory: catId,
    });
  } catch (error) {
    console.log(error);
  }
});

router.use("/blogs/:blog_id", async (req, res, next) => {
  /*   res.sendFile(path.join(__dirname, "../views/users", "blogs-detail.html")); */
  try {
    const id = req.params.blog_id;
    const blog = await db.execute("select * from blog where blogid = ?", [id]);
    if (blog[0][0]) {
      res.render("./users/blogs-detail", {
        blog: blog[0][0],
        title: blog[0][0].baslik,
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.end();
  }
});

router.use("/blogs", async (req, res, next) => {
  /*  res.sendFile(path.join(__dirname, "../views/users", "blogs.html")); */

  try {
    const [blogs] = await db.execute("select * from blog where onay = 1");
    const [category] = await db.execute("select * from category");
    res.render("./users/blogs", {
      title: "Popüler Kurslar",
      blogs,
      categories: category,
      selectedCategory: null,
    });
  } catch (error) {
    console.log(error);
  }
});

router.use("/", async (req, res, next) => {
  /*   res.sendFile(path.join(__dirname, "../views/users", "index.html")); */
  try {
    const [blogs] = await db.execute("select * from blog where onay = 1");
    const [category] = await db.execute("select * from category");
    res.render("./users/index", {
      title: "Tüm Kurslar",
      blogs,
      categories: category,
      selectedCategory: null,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
