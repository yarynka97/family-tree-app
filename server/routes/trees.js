const MongoClient = require('mongodb').MongoClient;
const router = require('express').Router();
const config = require('../../config');

const User = require('../db/user.js');

var treeCollection;
var connected = false;

MongoClient.connect(config.db_url, (err, client) => {
    if (err) return console.log(err)
    treeCollection = client.db('family-tree-app').collection('trees');
    connected = true;
    console.log('Connected to DB');
})

//add new tree to database
router.post('/', (req, res) => {
  if(connected){
    treeCollection.save(req.body.tree, (err, tree) => {
        if (err) {
            res.status(500).send('Server couldn\'t save this tree');
            return console.log(err);
        }
        User.findOne({ 'username': req.body.username }, (err, user) => {
              if (err) return res.status(500).send("There was a problem finding the user.");
              if (!user) return res.status(404).send("No user found.");
              var trees = user.trees.push({
                treename: tree.treename,
                id: tree._id
              });
              User.findOneAndUpdate({ 'username': req.body.username }, { $set: trees }, { new: true }, (err, updatedUser) => {
                  if (err) return res.status(500).send("There was a problem finding the user.");
                  if(!updatedUser) return res.status(500).send("There was a problem with updating user info.");
                  res.status(200).send(updatedUser);
                });
          });
  } else {
    console.log('no db connection');
  }
});

//get tree by id
router.get('/:id', (req, res) => {
  treeCollection.findOne({ _id: ObjectId(req.params.id) }, (err, tree) => {
    if(err) return res.status(500).send(`Server couldn\'t proccess request to database`);
    if(!tree) return res.status(404).send('Tree with that id doesn\'t exist');
    res.status(200).send(tree);
  });
});

//update tree
router.put('/:id', (req, res) => {
  treeCollection.findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: req.body }, { new: true }, (err, tree) => {
    if (err) return res.status(500).send("There was a problem finding the tree.");
    if(!tree) return res.status(500).send("There was a problem with updating tree info.");
    res.status(200).send(tree);
  });
});

//delete tree
router.delete('/:username/:treeId', (req, res) => {
  treeCollection.deleteOne({ _id: ObjectId(req.params.treeId) }, (err, tree) => {
    if(err) return res.status(500).send('Server couldn\'t delete tree');
    if(!tree) return res.status(404).send('Server couldn\'t delete tree, because no one was found');
    User.findOne({ 'username': req.params.username }, (err, user) => {
          if (err) return res.status(500).send("There was a problem finding the user.");
          if (!user) return res.status(404).send("No user found.");
          var treeIndex = user.trees.indexOf( t => t._id == tree._id );
          treeIndex == -1 ?
            return res.status(404).send("This user doesn\'t own this tree") :
            var trees = user.tree.splice(treeIndex, 1);
          User.findOneAndUpdate({ 'username': req.params.username }, { $set: trees }, { new: true }, (err, updatedUser) => {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if(!updatedUser) return res.status(500).send("There was a problem with updating user info.");
                res.status(200).send(updatedUser);
              });
        });
  })
});

module.exports = router;
