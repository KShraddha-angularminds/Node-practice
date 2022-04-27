const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const noteRouter = require("./routes/notes");
const empRouter = require("./routes/employee");
const employRouter = require("./routes/employ");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);
app.use("/api/employee", empRouter);
app.use("/api/employ", employRouter);
//connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connected to DB");
});

app.listen(3000, () => console.log("server up and running"));
