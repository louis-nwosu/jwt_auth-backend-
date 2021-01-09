const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config();

const AuthRouter = require("./routes/auth");

const app = express();

//connect to database
mongoose.connect(
  'process.env.DB_CONNECT',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("connected successfully to database")
);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));   

//routes
app.use("/auth", AuthRouter);

app.listen(8000, () => console.log("server is running on port 8000"));
