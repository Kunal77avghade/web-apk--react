const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

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

  var data = "<table border='1' cellpadding='5'>";
  data += "<tr><th>start</th><th>end</th><th>Ammount</th><th>Comment</th></tr>";

  message.forEach((i) => {
    data += `<tr><td>${i.start.split("T")[0]}</td><td>${
      i.end.split("T")[0]
    }</td><td>${i.ammount}</td><td>${i.comment}</td></tr>`;
  });

  data += "</table>";
  const mailoptions = {
    from: "kunal77avghade@gmail.com",
    to: email,
    subject: subject,
    html: `<h2>Hi there please find Invoice details </h2> <br/>${data}`,
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
