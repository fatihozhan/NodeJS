// Description: Express server
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
//Custom Modules
const path = require("path");
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const locals = require("./middlewares/locals");
const csurf = require("csurf");
//Routes
const userRoutes = require("./routes/user");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
//Models
const Blog = require("./models/blog");
const Category = require("./models/category");
const User = require("./models/user");
const Role = require("./models/role");

//Template Engine
app.set("view engine", "ejs");
app.get("view engine");
app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
//form datalarının sağlıklı bir şekilde gelebilmesi için
//Midalwares
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); //cookie parser middleware kullanımı için
app.use(
  session({
    secret: "veryverysecret",
    resave: false, //session değiştiğinde tekrar kaydetme
    saveUninitialized: false, //session oluşturulmadığında kaydetme
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //1 hafta
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);
app.use(locals);
app.use(csurf());

//Tüm sayfalarda kullanılabilmesi için global değişken olarak tanımlanır

//Routes
app.use("/admin", adminRouter);
app.use("/account", authRouter);
app.use(userRoutes);

//İlişkiler
//OnetoMany
Blog.belongsToMany(Category, { through: "blogCategories" });
Blog.belongsTo(User, {
  foreignKey: {
    allowNull: true,
  },
}); //Blog tablosunda userId alanı oluşur ve user tablosundaki id ile ilişkilendirilir
User.hasMany(Blog); //User tablosunda blogId alanı oluşur ve blog tablosundaki id ile ilişkilendirilir
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
Role.belongsToMany(User, { through: "userRoles" });
User.belongsToMany(Role, { through: "userRoles" }); //User tablosunda roleId alanı oluşur ve role tablosundaki id ile ilişkilendirilir

(async function () {
/*       await sequelize.sync({ force: true });
  await dummyData(); */
})();

app.listen(3000, () => console.log("listening on port 3000"));
