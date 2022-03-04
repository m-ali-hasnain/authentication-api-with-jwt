const userModel = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
//function for registering user
const register = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  if (!userName && !userEmail && !userPassword) {
    res.status(400).send("Please provide all details");
  } else {
    //checking if account already exists
    const isExists = await userModel.findOne({ userEmail: userEmail });
    if (isExists) {
      res.status(400).send(`User with email ${userEmail} already exists...`);
    } else {
      //creating user now
      const newUser = await userModel.create({
        userName,
        userEmail,
        userPassword,
      });

      //now creating json web token
      const token = jsonwebtoken.sign(
        { userId: newUser._id, userEmail },
        process.env.JSON_WEB_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      //setting it to newUser instance
      const updated = await userModel.findByIdAndUpdate(
        newUser._id,
        { token: token },
        { new: true }
      );

      res.status(200).send(updated);
    }
  }
};

//this function will check user credentials and authenticate user
const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail && !userPassword) {
    res.status(400).send("Please enter email and password");
  } else {
    //lets now first check whether user exists or now
    const user = await userModel.findOne({ userEmail: userEmail });
    if (user && user.userPassword === userPassword) {
      //user logged in

      //now creating json web token
      const token = jsonwebtoken.sign(
        { userId: user._id, userEmail },
        process.env.JSON_WEB_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  }
};

//lets create controller for welcoming user
const welcome = async (req, res) => {
  if (req.user) {
    res.send(`Welcome ${req.user.userEmail}`);
  } else {
    res.status(404).send("You are not allowed to see this page");
  }
};

//exporting functions
module.exports = {
  register,
  login,
  welcome,
};
