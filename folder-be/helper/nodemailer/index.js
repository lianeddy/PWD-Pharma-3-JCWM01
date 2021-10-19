const nodemailer = require("nodemailer");
const NODEMAILER_CONFIG = require("../constants/nodemailer_config");
const transporter = nodemailer.createTransport({
  service: `${NODEMAILER_CONFIG.service}`,
  auth: {
    user: `${NODEMAILER_CONFIG.user}`,
    pass: `${NODEMAILER_CONFIG.password}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
