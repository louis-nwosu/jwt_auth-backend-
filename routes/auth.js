const express = require('express');
const UserAuth = require('../models/userModel');

const Auth = express.Router();

Auth.get('/', async (req, res) => {
  try {
    const data = await UserAuth.find();
    res.status(200).json({data: 'sent'})
  }catch(err) {
    res.status(400).json(err);
  }
})

Auth.post('/register', async (req, res) => {
    const user = new UserAuth({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await UserAuth.save();
        res.status(200).json({user: savedUser});
    }catch(err) {
        res.status(400).json(err);
    }
})

module.exports = Auth;