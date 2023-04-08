const Blog = require("../models/blog");
const Category = require("../models/category");
const slugField = require("../helpers/slugfield");

async function populate() {
  try {
    console.log("senkronizasyon sağlandı");
    /*     await Category.create({name : "Mobil Geliştirme"})
      await Category.create({name : "Web Geliştirme"})
      await Category.create({name : "YZ"}) */
    const count = await Category.count();
    if (count == 0) {
      const categories = await Category.bulkCreate([
        { name: "Web Geliştirme", url: slugField("Web Geliştirme") },
        { name: "Mobil Geliştirme", url: slugField("Mobil Geliştirme") },
        { name: "Yapay Zeka", url: slugField("Yapay Zeka") },
      ]);
      await Category.sync({ alter: true });
      const blogs = await Blog.bulkCreate([
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
        {
          baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
          altbaslik: "Selam bu bir altbaşlık",
          aciklama: "Bu bir açıklamadır.",
          url : slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
          resim: "1.jpeg",
          anasayfa: true,
          onay: true,
        },
      ]);
      await Blog.sync({ alter: true });
      await categories[0].addBlog(blogs[0])
      await categories[0].addBlog(blogs[1])
      await categories[0].addBlog(blogs[2])
      await categories[0].addBlog(blogs[3])
      await categories[0].addBlog(blogs[4])
      await categories[0].addBlog(blogs[5])
      await categories[0].addBlog(blogs[6])
      await categories[0].addBlog(blogs[1])
      await categories[1].addBlog(blogs[2])
      await categories[1].addBlog(blogs[3])
      await categories[2].addBlog(blogs[2])
      await categories[2].addBlog(blogs[1])

      await blogs[0].addCategory(categories[1])
      console.log("senkronizasyon sağlandı");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = populate;
