const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//import environment variables
const dotenv = require("dotenv");
dotenv.config();

//local imports
const UserAuth = require("../models/userModel");
const { registerValidation, loginValidation } = require("../validation");

const Auth = express.Router();

Auth.get("/", async (req, res) => {
  try {
    const data = await UserAuth.find();
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json(err);
  }
});

Auth.get("/:ID", async (req, res) => {
  try {
    const data = await UserAuth.findById(req.params.ID);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json(err);
  }
});

Auth.post("/register", async (req, res) => {
  //Validate data before making a user
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //check if user already exists
  const userExists = await UserAuth.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400).send("user already exists..");
    return;
  }
  //hash the password
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  //create new user
  const user = new UserAuth({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    //save the user to the datebase
    const savedUser = await user.save();
    res.status(200).json({ user: savedUser });
    //catch the error
  } catch (err) {
    res.status(400).json(err);
  }
});

//login
Auth.post("/login", async (req, res) => {
  //Validate data 
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //check if user exists
  const user = await UserAuth.findOne({ email: req.body.email });
  if (!user) {
    return res.status(200).send("email is wrong..");
  }
  //check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("password is incorrect");
  }
  //create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  //send back data if everything is okay!
  res.header('auth-token', token).status(200).json(user);
});

module.exports = Auth;
