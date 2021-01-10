const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const AuthRouter = require("./routes/auth");

const app = express();

//connect to database
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const { connection } = mongoose;

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  console.log("database connection established successfully");
});

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/auth", AuthRouter);

app.listen(8000, () => console.log("server is running on port 8000"));
