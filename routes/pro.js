const pro = require("express").Router();

//local imports
const verify = require("../verifyToken");

//routes
pro.get("/protected", verify, (req, res) => {
  try {
    return res.status(200).json({
      post: {
        title: "my first post",
        description: "some random data",
      },
    });
  } catch (error) {
    return res.send(error);
  }
});

module.exports = pro;
