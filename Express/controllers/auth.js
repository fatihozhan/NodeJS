const User = require("../models/user");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/send-mailer");
const config = require("../config");
const crypto = require("crypto");
const { Op } = require("sequelize");

exports.get_register = async (req, res) => {
  try {
    res.render("auth/register", {
      title: "Register",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      req.session.message = {
        text: "Bu email adresi kullaniliyor.",
        class: "warning",
      };
      return res.redirect("/account/login");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    emailService.sendMail({
      from: config.email.from,
      to: newUser.email,
      subject: "Hesap olusturuldu.",
      text: "Hesabınız Başarılı Bir Şekilde Oluşturuldu.",
    });
    req.session.message = { text: "Hesabiniz olusturuldu.", class: "success" };
    return res.redirect("/account/login");
  } catch (error) {
    console.log(error);
  }
};

exports.get_login = async (req, res) => {
  try {
    const message = req.session.message;
    delete req.session.message;
    return res.render("auth/login", {
      title: "Login",
      message,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("auth/login", {
        title: "Login",
        message: (req.session.message = {
          text: "Email hatali.",
          class: "warning",
        }),
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const userRoles = await user.getRoles({attributes : ["roleName"], raw : true});
      req.session.roles = userRoles.map((role) => role.roleName);
      // res.cookie("isAuth", 1); // Cookie oluşturma
      req.session.isAuth = true; // Session oluşturma
      req.session.name = user.name;
      req.session.userid = user.id; 
      const url = req.query.callbackUrl || "/";
      return res.redirect(url);
    }
    return res.render("auth/login", {
      title: "Login",
      message: (req.session.message = {
        text: "Parola hatali.",
        class: "danger",
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.get_logout = async (req, res) => {
  try {
    // res.clearCookie("isAuth"); // Cookie silme
    await req.session.destroy(); // Session silme
    return res.redirect("/account/login");
  } catch (error) {
    console.log(error);
  }
};

exports.get_reset_password = async (req, res) => {
  const mesaj = req.session.message;
  delete req.session.message;
  try {
    return res.render("auth/reset-password", {
      title: "Reset Password",
      message: mesaj,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_reset_password = async (req, res) => {
  const { email } = req.body;
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      req.session.message = {
        text: "Bu email adresi bulunamadi.",
        class: "warning",
      };
      return res.redirect("/account/reset-password");
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 saat
    await user.save();
    emailService.sendMail({
      from: config.email.from,
      to: user.email,
      subject: "Sifre sıfırlama",
      html: `<p><a href="http://localhost:3000/account/new-password/${token}">Sifre sıfırlama linki</a></p>`,
    });
    req.session.message = {
      text: "Sifre sıfırlama linki email adresinize gönderildi.",
      class: "success",
    };
    return res.redirect("/account/login");
  } catch (error) {
    console.log(error);
  }
};

exports.get_new_password = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gt]: Date.now() },
      },
    });
    return res.render("auth/new-password", {
      title: "New Password",
      userId: user.id,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_new_password = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = req.body.userId;
    const password = req.body.password;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();
    req.session.message = {
      text: "Sifreniz basariyla degistirildi.",
      class: "success",
    };

    return res.redirect("/account/login");
  } catch (error) {
    console.log(error);
  }
};
