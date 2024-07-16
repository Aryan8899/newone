const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const myemail = "webthreeworldmarketplace@gmail.com";
const mypassword = "thds gueb xiud yswg";

function sendEmail({ recipient_email, subject, message }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myemail,
        pass: mypassword,
      },
    });

    const mail_configs = {
      from: myemail,
      to: recipient_email,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mail_configs, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred: ${error.message}` });
      }
      console.log("Email sent:", info.response);
      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.get("/", (req, res) => {
  res.send("Email service is running");
});

app.post("/send_email", (req, res) => {
  const { recipient_email, subject, message } = req.body || {};
  
  if (!recipient_email) {
    return res.status(400).send('Recipient email is required');
  }

  sendEmail({ recipient_email, subject, message })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
