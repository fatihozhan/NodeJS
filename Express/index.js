const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require("./routes/user");
const adminRouter = require("./routes/admin");
const Blog = require("./models/blog");
const Category = require("./models/category");

app.set("view engine", "ejs");
app.get("view engine");
app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
//form datalarının sağlıklı bir şekilde gelebilmesi için
app.use(express.urlencoded({ extended: false }));

app.use("/admin/", adminRouter);
app.use(userRoutes);

const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
//İlişkiler
//OnetoMany
Blog.belongsToMany(Category, { through: "blogCategories" });
Category.belongsToMany(Blog, { through: "blogCategories" });
/* Category.hasMany(Blog, {
  foreignKey: {
    name: "categoryId",
    allowNull: true,
    // defaultValue: 1,
  },
//   onDelete : "RESTRICT",
//Kategori silinirse eğer ürününde onunla birlikte silinmesini engeller
  onDelete : "SET NULL",
  onUpdate : "RESTRICT"
});
Blog.belongsTo(Category); */
//uygulanması - sync

(async function () {
  await sequelize.sync({ force: true });
  await dummyData();
})();

app.listen(3000, () => console.log("listening on port 3000"));
