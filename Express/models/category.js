const { DataTypes } = require("sequelize");

const sequelize = require("../data/db");
const Category = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, collate: "utf8_general_ci" }
);

async function sync() {
  try {
    await Category.sync({ alter: true });
    console.log("senkronizasyon sağlandı");
    /*     await Category.create({name : "Mobil Geliştirme"})
    await Category.create({name : "Web Geliştirme"})
    await Category.create({name : "YZ"}) */
    const count = await Category.count();
    if (count == 0) {
      await Category.bulkCreate([
        { name: "Web Geliştirme" },
        { name: "Mobil Geliştirme" },
        { name: "Yapay Zeka" },
      ]);
      console.log("Kategori Eklendi");
    }
  } catch (error) {
    console.log(error);
  }
}
// sync();

module.exports = Category;
