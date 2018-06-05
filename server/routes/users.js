const router = require('express').Router();
const User = require('../db/user.js');
const config = require('../../config');

router.post('/', (req, res) => {
  User.create({
    username : req.body.username,
    email : req.body.email,
    password : req.body.password,
    trees: req.body.trees || []
  }, (err, user) => {
      if (err) return res.status(500).send("There was a problem registering the user`.");

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    });
});
