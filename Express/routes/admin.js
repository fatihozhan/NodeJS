const express = require("express");
const router = express.Router();
const imageUpload = require("../helpers/image-helpers");
const controller = require("../controllers/admin");
const isAuth = require("../middlewares/auth");
const csrf = require("../middlewares/csrf");

router.get("/blog/create", csrf, controller.get_blog_create);

router.post(
  "/blog/create",
  imageUpload.upload.single("resim"),
  isAuth,
  controller.post_blog_create
);

router.get("/blogs", isAuth, controller.get_blogs);

router.get("/blogs/:blogid", isAuth, csrf, controller.get_blog_details);

router.post(
  "/blogs/:blogid",
  imageUpload.upload.single("resim"),
  isAuth,
  controller.post_blog_update
);

router.get("/blogs/delete/:blogid", csrf, isAuth, controller.get_blog_delete);

router.post("/blogs/delete/:blogid", isAuth, controller.post_blog_delete);

router.get("/categories", controller.get_categories);

router.get("/category/create", csrf, isAuth, controller.get_categories_create);

router.post("/category/create", isAuth, controller.post_categories_create);

router.get(
  "/category/:categoryid",
  csrf,
  isAuth,
  controller.get_categories_details
);

router.post("/category/:categoryid", isAuth, controller.post_categories_update);

router.get(
  "/category/delete/:categoryid",
  isAuth,
  csrf,
  controller.get_category_delete
);

router.post(
  "/category/delete/:categoryid",
  isAuth,
  controller.post_categories_delete
);

router.post("/categories/remove", isAuth, controller.get_category_remove);

router.get("/roles", isAuth, controller.get_roles);
router.get("/roles/:roleid", isAuth, csrf, controller.get_roles_details);
router.post("/roles/remove", isAuth, controller.post_roles_remove);
router.post("/roles/:roleid", isAuth, controller.post_roles_update);

router.get("/users", isAuth, controller.get_users);
router.get("/users/:userid", isAuth, csrf, controller.get_users_details);
router.post("/users/:userid", isAuth, controller.post_users_update);
// router.post("/users/remove", isAuth, controller.post_users_remove);

module.exports = router;
