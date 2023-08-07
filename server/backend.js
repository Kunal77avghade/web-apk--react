const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/data", (req, res) => {
  const { email, subject, message } = req.body;
  console.log("Received POST data:", email, subject, message);

  const transponder = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "kunal77avghade@gmail.com",
      pass: "devmniovyayewxnl",
    },
  });

  const emailTemplate = fs.readFileSync(
    path.join(__dirname, "email.html"),
    "utf-8"
  );
  const template = handlebars.compile(emailTemplate);
  handlebars.registerHelper("splitdate", (date) => {
    return date.split("T")[0];
  });

  const emailFrame = template({ message });

  const mailoptions = {
    from: "kunal77avghade@gmail.com",
    to: email,
    subject: subject,
    html: emailFrame,
  };

  transponder.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("sent");
    }
  });

  res.status(200).json({ message: "Data received successfully" });
});
