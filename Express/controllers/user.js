const Blog = require("../models/blog");
const Category = require("../models/category");
const { Op } = require("sequelize");

/* exports.blogs_by_category = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const blog = await Blog.findAll({
      where: { onay: true },
      include: { model: Category, where: { url: slug } },
      raw: true,
    });

    const categories = await Category.findAll({ raw: true });
    res.render("./users/blogs", {
      title: "Tüm Kurslar",
      blogs: blog,
      categories: categories,
      selectedCategory: slug,
    });
  } catch (error) {
    console.log(error);
  }
}; */

exports.blogs_details = async (req, res, next) => {
  /*   res.sendFile(path.join(__dirname, "../views/users", "blogs-detail.html")); */
  try {
    const slug = req.params.slug;
    const blog = await Blog.findOne({ where: { url: slug } }, { raw: true });
    if (blog) {
      res.render("./users/blogs-detail", {
        blog: blog,
        title: blog.baslik,
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.end();
  }
};

exports.blog_list = async (req, res, next) => {
  /*  res.sendFile(path.join(__dirname, "../views/users", "blogs.html")); */

  try {
    const slug = req.params.slug;
    const size = 3;
    const page = req.query.page || 1;
    const {rows, count} = await Blog.findAndCountAll({
      where: { onay: true },
      raw: true,
      include: slug ? { model: Category, where: { url: slug } } : null,
      limit: size,
      offset: (page - 1) * size,
    });
    const category = await Category.findAll({ raw: true });
    res.render("./users/blogs", {
      title: "Popüler Kurslar",
      blogs:rows,
      total:count,
      pages : Math.ceil(count/size),
      current:page,
      categories: category,
      selectedCategory: slug,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        [Op.and]: [{ anasayfa: true, onay: true }],
      },
      raw: true,
    });
    const category = await Category.findAll({ raw: true });
    return res.render("./users/index", {
      title: "Tüm Kurslar",
      blogs,
      categories: category,
      selectedCategory: null,
    });
  } catch (error) {
    console.log(error);
  }
};
