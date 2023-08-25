const User = require("../Models//UserModel");
//

const { hashSync, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUpUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
      email: req.body.email,
    });
    if (newUser) {
      const payload = {
        username: req.body.username,
        password: newUser.password,
        email: newUser.email,
      };
      const token = jwt.sign(payload, "secret", {
        expiresIn: "1d",
      });
      await newUser.save();

      // res.status(200).json(newUser);
      res
        // .send({
        //   msg: "Successfully Created!",
        //   data: {
        //     user: { username: newUser.username, _id: newUser._id },
        //     token: token,
        //   },
        // })
        .json(newUser);
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Creating new User", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email: email }); // Using findOne instead of find
    // if (loginUser && loginUser.password === password) {
    //   res.status(200).json(loginUser);
    // } else {
    //   res.status(401).json({ message: "Invalid email or password" });
    // }
    if (user) {
      const isLoggedin = await compare(req.query.password, user.password);
      if (isLoggedin) {
        const payload = {
          username: user.username,
          password: user.password,
          email: user.email,
        };
        const token = jwt.sign(payload, "secret", {
          expiresIn: "1d",
        });
        return res
          .status(200)
          .send({
            msg: "Successfully Logged In",
            data: {
              token: token,
              user: { username: user.username, _id: user._id },
            },
          })
          .json(user);
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error logging in User", error: err.message });
  }
};

exports.logoutUser = async (req, res) => {
  // Clear the token cookie
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
};
