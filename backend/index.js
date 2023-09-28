const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// console.log(process.env)

// routes
const mainRoutes = require("./routes/main");
console.log(process.env.ORIGIN)

app.use(cors({ credentials: true, origin:process.env.ORIGIN }));

app.use(express.json());
app.use(bodyParser.json());

// Setup Routes
app.use("/", mainRoutes);

app.listen(8000, () => {
  console.log("Server has started");
});
