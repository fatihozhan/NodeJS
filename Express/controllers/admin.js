const fs = require("fs");
const Blog = require("../models/blog");
const Category = require("../models/category");
const { Op } = require("sequelize");
const sequelize = require("../data/db");
const slugfield = require("../helpers/slugfield");
exports.get_blog_delete = async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const blog = await Blog.findByPk(blogid);
    if (blog) {
      return res.render("admin/blog-delete", {
        title: "Delete Blog",
        blog,
      });
    }
    res.render("admin/blog-delete", {
      title: "Blog Delete",
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_blog_delete = async (req, res) => {
  const blogid = req.body.blogid;
  try {
    const blog = await Blog.findByPk(blogid);
    if (blog) {
      await blog.destroy();
      return res.redirect("/admin/blogs?action=delete");
    }
    res.redirect("/admin/blogs");
  } catch (error) {
    console.log(error);
  }
};

exports.get_blog_create = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.render("admin/blog-create", {
      title: "Add Blog",
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_blog_create = async (req, res) => {
  const { aciklama, baslik, altbaslik, kategori } = req.body;
  const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
  const onay = req.body.onay == "on" ? 1 : 0;
  const resim = req.file.filename;
  try {
    await Blog.create({
      baslik,
      aciklama,
      altbaslik,
      anasayfa,
      onay,
      resim,
      url: slugfield(baslik),
    });
    res.redirect("/admin/blogs?action=create");
  } catch (error) {
    console.log(error);
  }
};

exports.get_blogs = async (req, res) => {
  try {
    const size = 3
    const page = req.query.page || 1;
    const blogs = await Blog.findAll({
      attributes: ["id", "baslik", "altbaslik", "resim"],
      //Eager Loading...
      include: { model: Category, attributes: ["name"] },
      limit:size,
      offset:(page-1)*size
    });
    res.render("admin/blog-list", {
      title: "Blog List",
      blogs,
      action: req.query.action,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.get_blog_details = async (req, res) => {
  try {
    const blogid = req.params.blogid;
    const blogs = await Blog.findOne({
      where: { id: blogid },
      include: { model: Category, attributes: ["id"] },
    });
    const categories = await Category.findAll();
    if (blogs) {
      return res.render("admin/blog-edit", {
        title: blogs.baslik,
        blog: blogs,
        categories,
      });
    }
    res.redirect("admin/blogs");
  } catch (error) {
    console.log(error);
  }
};
exports.post_blog_update = async (req, res) => {
  try {
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const catIds = req.body.categories;
    const url = req.body.url
    let resim = req.body.resim;
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
    if (req.file) {
      resim = req.file.filename;
      fs.unlink("./public/images/" + req.body.resim, (err) => {
        if (err) console.log(err);
      });
    }
    const blog = await Blog.findOne({
      where: { id: blogid },
      include: { model: Category, attributes: ["id"] },
    });
    if (blog) {
      blog.baslik = baslik;
      blog.altbaslik = altbaslik;
      blog.aciklama = aciklama;
      blog.resim = resim;
      blog.onay = onay;
      blog.url = url
      blog.anasayfa = anasayfa;
      if (catIds == undefined) {
        await blog.removeCategories(blog.categories);
      } else {
        await blog.removeCategories(blog.categories);
        const selectedCategories = await Category.findAll({
          where: { id: { [Op.in]: catIds } },
        });
        await blog.save();
        return res.redirect("/admin/blogs?action=edit");
      }

      res.redirect("/admin/blogs");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.get_categories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.render("admin/category-list", {
      title: "Category List",
      categories: categories,
      action: req.query.action,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.get_categories_create = async (req, res) => {
  try {
    res.render("admin/category-create", {
      title: "Add category",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.post_categories_create = async (req, res) => {
  const { name } = req.body;
  try {
    await Category.create({ name });
    res.redirect("/admin/categories?action=create");
  } catch (error) {
    console.log(error);
  }
};
exports.get_categories_details = async (req, res) => {
  try {
    const categoryid = req.params.categoryid;
    const categories = await Category.findOne({
      where: {
        id: categoryid,
      },
    });
    //Lazy Loading...
    const blogs = await categories.getBlogs({ raw: true });
    const countBlogs = await categories.countBlogs();
    res.render("admin/category-edit", {
      title: "Kategori Edit",
      category: categories,
      blogs,
      countBlogs,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.post_categories_update = async (req, res) => {
  try {
    const categoryid = req.params.categoryid;
    const name = req.body.name;
    const categories = await Category.findByPk(categoryid);
    if (categories) {
      await Category.update(
        { name },
        {
          where: {
            id: categoryid,
          },
        }
      );
      return res.redirect("/admin/categories?action=edit");
    }
    res.redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }
};
exports.post_categories_delete = async (req, res) => {
  const categoryid = req.body.categoryid;
  try {
    await Category.destroy({
      where: {
        id: categoryid,
      },
    });
    res.redirect("/admin/categories?action=delete");
  } catch (error) {
    console.log(error);
  }
};

exports.get_category_delete = async (req, res) => {
  const categoryid = req.params.categoryid;
  try {
    const category = await Category.findOne({
      where: { id: categoryid },
      raw: true,
    });
    res.render("admin/category-delete", {
      title: "Kategori Delete",
      category,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.get_category_remove = async (req, res) => {
  const blogid = req.body.blogid;
  const categoryid = req.body.categoryid;
  try {
    await sequelize.query(
      `DELETE FROM blogCategories WHERE blogId = ${blogid} AND categoryId = ${categoryid}`
    );
    res.redirect("/admin/category/" + categoryid);

  } catch (error) {
    console.log(error);
  }
};
