const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// routes
const mainRoutes = require("./routes/main");
app.use(cors({ credentials: true, origin:"http://127.0.0.1:5173"  }));

app.use(express.json());
app.use(bodyParser.json());

// Setup Routes
app.use("/", mainRoutes);

app.listen(8000, () => {
  console.log("Server has started");
});
