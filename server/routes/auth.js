const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../config');
const User = require('../db/user');
const verifyToken = require('../verifyToken');

router.post('/login', (req, res) => {
  console.log(req.body);
  User.findOne({ 'username': req.body.username }, function (err, user) {
   if (err) return res.status(500).send('Error on the server.');
   if (!user) return res.status(404).send('No user found.');

   const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
   if (!passwordIsValid) return res.status(401).send({ message:"Invalid password", auth: false, token: null });

   const token = jwt.sign({ id: user._id }, config.secret, {
     expiresIn: 86400 // 24 hours
   });

   res.status(200).send({ auth: true, token });
 });
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get('*', function (req, res) {
    res.status(404).send('No such route');
});

module.exports = router;
