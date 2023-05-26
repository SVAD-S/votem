import nodemailer from "nodemailer";
import config from "../config.js";
const sendEmail = async (options) => {
  try {
    // create a transporter
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_USER_PASS } = config;
    const transport = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_USER_PASS,
      },
    });

    // define mail options

    const mailOptions = {
      from: EMAIL_USER,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // send the mail

    var status = transport.sendMail(mailOptions, function (error, info) {
      console.log("info...", info);
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
