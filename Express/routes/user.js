const express = require("express");
const path = require("path");
const router = express.Router();
const data = {
    title : "Popüler Kurslar",
    categories : ["Web Geliştirme", "Programlama", "Mobil Uygulamalar", "Veri Analizi", "Ofis Uygulamaları"]
}

router.use("/blogs/:blog_id", (req, res, next) => {
/*   res.sendFile(path.join(__dirname, "../views/users", "blogs-detail.html")); */
res.render("./users/blogs-detail")
});


router.use("/blogs", (req, res, next) => {
 /*  res.sendFile(path.join(__dirname, "../views/users", "blogs.html")); */
 res.render("./users/blogs")
});


router.use("/", (req, res, next) => {
/*   res.sendFile(path.join(__dirname, "../views/users", "index.html")); */
res.render("./users/index",data)
});

module.exports = router;
