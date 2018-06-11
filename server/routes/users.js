const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../db/user.js');
const config = require('../../config');
const verifyToken = require('../VerifyToken');

// register new user
router.post('/', (req, res) => {
  User.create({
    username : req.body.username,
    email : req.body.email,
    password : req.body.password,
    firstName : req.body.firstName || '',
    lastName : req.body.lastName || '',
    trees: req.body.trees || []
  }, (err, user) => {
      if (err) return res.status(500).send("There was a problem registering the user`.");

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({ auth: true, token });
    });
});

//get existing user
router.get('/:id', verifyToken, (req, res) => {
  User.findOne({ 'username': req.params.id }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

//update user info
router.put('/:id', verifyToken, (req,res)=>{
  User.findOneAndUpdate({ 'username': req.params.id }, { $set: req.body }, { new: true }, function(err, user){
    if (err) return res.status(500).send("There was a problem finding the user.");
    if(!user) return res.status(500).send("There was a problem with updating user info.");
    res.status(200).send(user);
  });
})

module.exports = router;
