const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const PORT = process.env.PORT || 3000;

const sendgridMailer = (email, token) => {
  const msg = {
    to: email, // Change to your recipient
    from: "frandrewjs@gmail.com", // Change to your verified sender
    subject: "Email verification",
    html: `<a href='http://localhost:${PORT}/api/users/verify/${token}'>Please confirm your email address</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendgridMailer;
