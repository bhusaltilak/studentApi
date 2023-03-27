const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validate = require("fastest-validator");

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exist",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const userCreate = {
              Name: req.body.Name,
              email: req.body.email,
              password: hash,
            };
            console.log(userCreate);
            models.User.create(userCreate)
              .then((result) => {
                return res.status(200).json({
                  message: "Successfully created",
                  user:userCreate
                });
              })
              .catch((error) => {
                res.status(400).json({
                  message: "Error Occur",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong!",
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user == null) {
        res.status(401).json({
          message: "Wrong email!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_SECRET,
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication Successful!",
                    token: token,
                  });
                
                }
              );
            } else {
              res.status(401).json({
                message: "Wrong password!",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}
module.exports = {
  signUp: signUp,
  login: login,
};
