const express = require("express");
const fs = require("fs");
const db = require("../data/db");
const router = express.Router();
const imageUpload = require("../helpers/image-helpers");

router.get("/blog/create", async (req, res) => {
  try {
    const [categories] = await db.execute("select * from category");

    res.render("admin/blog-create", {
      title: "Add Blog",
      categories,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/blog/create", imageUpload.upload.single("resim"), async (req, res) => {
  const { aciklama, baslik, altbaslik, kategori } = req.body;
  const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
  const onay = req.body.onay == "on" ? 1 : 0;
  const resim = req.file.filename;
  try {
    await db.execute(
      "insert into blog(baslik, altbaslik, aciklama, resim, anasayfa, onay, categoryid) values (?,?,?,?,?,?)",
      [baslik, altbaslik, aciklama, resim, anasayfa, onay, kategori]
    );
    res.redirect("/admin/blogs?action=create");
  } catch (error) {
    console.log(error);
  }
});

router.get("/blogs", async (req, res) => {
  try {
    const [blogs] = await db.execute("select blogid,baslik,altbaslik,resim from blog");
    res.render("admin/blog-list", {
      title: "Blog List",
      blogs,
      action: req.query.action,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/blogs/:blogid", async (req, res) => {
  try {
    const blogid = req.params.blogid;
    const [blogs] = await db.execute("select * from blog where blogid =?", [
      blogid,
    ]);
    const [categories] = await db.execute("select * from category");
    const blog = blogs[0];
    if (blog) {
      return res.render("admin/blog-edit", {
        title: blog.baslik,
        blog,
        categories,
      });
    }
    res.redirect("admin/blogs");
  } catch (error) {
    console.log(error);
  }
});

router.post("/blogs/:blogid", imageUpload.upload.single("resim"), async (req, res) => {
  try {
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    let resim = req.body.resim;
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
    const kategori = req.body.kategori;
    if (req.file) {
      resim = req.file.filename;
      fs.unlink("./public/images/" + req.body.resim, (err) => {
        if (err) console.log(err);
      });
    }
    await db.execute(
      "Update blog set baslik=?, altbaslik=? aciklama=?, resim=?, anasayfa =?, onay=?, categoryid =? where blogid =?",
      [baslik, altbaslik, aciklama, resim, anasayfa, onay, kategori, blogid]
    );
    res.redirect("/admin/blogs?action=edit");
  } catch (error) {
    console.log(error);
  }
});

router.get("/blogs/delete/:blogid", async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const [blogs] = await db.execute("select * from blog where blogid=?", [
      blogid,
    ]);
    const blog = blogs[0];
    res.render("admin/blog-delete", {
      title: "Blog Delete",
      blog,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/blogs/delete/:blogid", async (req, res) => {
  const blogid = req.body.blogid;
  try {
    await db.execute("delete from blog where blogid=?", [blogid]);
    res.redirect("/admin/blogs?action=delete");
  } catch (error) {
    console.log(error);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const [categories] = await db.execute("select * from category");
    res.render("admin/category-list", {
      title: "Category List",
      categories,
      action: req.query.action,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/category/create", async (req, res) => {
  try {
    res.render("admin/category-create", {
      title: "Add category",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/category/create", async (req, res) => {
  const { name } = req.body;
  try {
    await db.execute("insert into category(name) values (?)", [name]);
    res.redirect("/admin/categories?action=create");
  } catch (error) {
    console.log(error);
  }
});

router.get("/categories/:categoryid", async (req, res) => {
  try {
    const categoryid = req.params.categoryid;
    const [categories] = await db.execute(
      "select * from category where categoryid = ?",
      [categoryid]
    );
    const category = categories[0];
    res.render("admin/category-edit", {
      title: "Kategori Edit",
      category,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/categories/:categoryid", async (req, res) => {
  try {
    const categoryid = req.params.categoryid;
    const name = req.body.name;
    const [categories] = await db.execute(
      "update category set name = ? where categoryid = ?",
      [name, categoryid]
    );
    res.redirect("/admin/categories?action=edit");
  } catch (error) {
    console.log(error);
  }
});

router.get("/category/delete/:categoryid", async (req, res) => {
  const categoryid = req.params.categoryid;
  try {
    const [categories] = await db.execute(
      "select * from category where categoryid=?",
      [categoryid]
    );
    const category = categories[0];
    res.render("admin/category-delete", {
      title: "Kategori Delete",
      category,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/category/delete/:categoryid", async (req, res) => {
  const categoryid = req.body.categoryid;
  try {
    await db.execute("delete from category where categoryid=?", [categoryid]);
    res.redirect("/admin/categories?action=delete");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
