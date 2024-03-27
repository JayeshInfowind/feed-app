require('dotenv').config()
const express = require("express");
require("./config/dbConfig");
const router = require('./router/mainRouter/mainRoute')
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", router); 

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});