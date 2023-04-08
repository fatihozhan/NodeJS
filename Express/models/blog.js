const { DataTypes } = require("sequelize");

const sequelize = require("../data/db");
const Blog = sequelize.define("blog", {
  baslik: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altbaslik: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aciklama: {
    type: DataTypes.STRING,
  },
  resim: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  anasayfa: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  onay: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
},{collate : "utf8_general_ci", timestamps:true});

async function sync() {
  try {
    await Blog.sync({ alter: true });
    console.log("senkronizasyon sağlandı");
    const count = await Blog.count();
    if (count == 0) {
      await Blog.create({
        baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
        altbaslik: "Selam bu bir altbaşlık",
        aciklama: "Bu bir açıklamadır.",
        resim: "1.jpeg",
        anasayfa: true,
        onay: true,
        categoryid: 1,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
// sync();

module.exports = Blog;
