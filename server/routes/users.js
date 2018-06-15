const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../db/user.js');
const config = require('../../config');
const verifyToken = require('../VerifyToken');

// register new user
router.post('/', async (req, res) => {
  try{
    const user = await User.create({
      username : req.body.username,
      email : req.body.email,
      password : req.body.password,
      firstName : req.body.firstName || '',
      lastName : req.body.lastName || '',
      trees: req.body.trees || []
    });
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ auth: true, token });
  } catch (err) {
   return res.status(500).send("There was a problem registering the user`.");
  }
});

//get existing user
router.get('/:id', verifyToken, async (req, res) => {
 try{
  const user = await User.findOne({ 'username': req.params.id });
  if (!user) return res.status(404).send("No user found.");
  res.status(200).send(user);
 } catch (err){
  return res.status(500).send("There was a problem finding the user.");
 }
});

//update user info
router.put('/:id', verifyToken, async (req,res)=>{
  try{
    const user = await User.findOneAndUpdate({ 'username': req.params.id }, { $set: req.body }, { new: true });
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  } catch (err){
    return res.status(500).send("There was a problem with updating user info.");
  }
})

module.exports = router;
