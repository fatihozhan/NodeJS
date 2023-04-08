const express = require("express");
const router = express.Router();
const controller = require("../controllers/user")

router.use("/blogs/category/:slug", controller.blog_list);

router.use("/blogs/:slug", controller.blogs_details);

router.use("/blogs", controller.blog_list);

router.use("/", controller.index);

module.exports = router;
