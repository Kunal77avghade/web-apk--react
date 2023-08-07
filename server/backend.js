const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
  const requestData = req.body;
  console.log("Received POST data:", requestData);
  res.status(200).json({ message: "Data received successfully" });
});
