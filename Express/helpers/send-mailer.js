const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: 587,
  secure: false,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: config.email.username,
    pass: config.email.password,
  },
});

module.exports = transporter;