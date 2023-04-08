const express = require("express");
const router = express.Router();
const imageUpload = require("../helpers/image-helpers");
const controller = require("../controllers/admin");

router.get("/blog/create", controller.get_blog_create);

router.post(
  "/blog/create",
  imageUpload.upload.single("resim"),
  controller.post_blog_create
);

router.get("/blogs", controller.get_blogs);

router.get("/blogs/:blogid", controller.get_blog_details);

router.post(
  "/blogs/:blogid",
  imageUpload.upload.single("resim"),
  controller.post_blog_update
);

router.get("/blogs/delete/:blogid", controller.get_blog_delete);

router.post("/blogs/delete/:blogid", controller.post_blog_delete);

router.get("/categories", controller.get_categories);

router.get("/category/create", controller.get_categories_create);

router.post("/category/create", controller.post_categories_create);

router.get("/category/:categoryid", controller.get_categories_details);

router.post("/category/:categoryid", controller.post_categories_update);

router.get("/category/delete/:categoryid", controller.get_category_delete);

router.post("/category/delete/:categoryid", controller.post_categories_delete);

router.post("/categories/remove", controller.get_category_remove);

module.exports = router;
