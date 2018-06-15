const MongoClient = require('mongodb').MongoClient;
const router = require('express').Router();
const config = require('../../config');

const User = require('../db/user.js');

//add new tree to database
router.post('/',  async (req, res) => {
  const db = await MongoClient.connect(config.db_url);
  const treeCollection = await db('family-tree-app').collection('trees');

  try{
    const user = await User.findOne({ 'username': req.body.username });
    if (!user) return res.status(404).send("No user found.");
    var trees = user.trees.push({
                treename: tree.treename,
                id: tree._id
              });
    const updatedUser = await User.findOneAndUpdate({ 'username': req.body.username }, { $set: trees }, { new: true });
    if(!updatedUser) return res.status(500).send("There was a problem with updating user info.");
    const newTree = treeCollection.save(req.body.tree);
    res.status(200).send(updatedUser);
  } catch (err) {
    return res.status(500).send("There was a problem with adding a tree to database");
  }
  db.close();
});

//get tree by id
router.get('/:id', async (req, res) => {
  const db = await MongoClient.connect(config.db_url);
  const treeCollection = await db('family-tree-app').collection('trees');

  treeCollection.findOne({ _id: ObjectId(req.params.id) }, (err, tree) => {
    if(err) return res.status(500).send(`Server couldn\'t proccess request to database`);
    if(!tree) return res.status(404).send('Tree with that id doesn\'t exist');
    res.status(200).send(tree);
  });
});

//update tree
router.put('/:id', async (req, res) => {
  const db = await MongoClient.connect(config.db_url);
  const treeCollection = await db('family-tree-app').collection('trees');

  treeCollection.findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: req.body }, { new: true }, (err, tree) => {
    if (err) return res.status(500).send("There was a problem finding the tree.");
    if(!tree) return res.status(500).send("There was a problem with updating tree info.");
    res.status(200).send(tree);
  });
});

//delete tree
router.delete('/:username/:treeId', async (req, res) => {
  const db = await MongoClient.connect(config.db_url);
  const treeCollection = await db('family-tree-app').collection('trees');

  try{
    const deletedTree = treeCollection.deleteOne({ _id: ObjectId(req.params.treeId) });
    if(!deletedTree) return res.status(404).send('Server couldn\'t delete tree, because no one was found');

    const user = await User.findOne({ 'username': req.params.username });
    if (!user) return res.status(404).send("No user found.");
    var treeIndex = user.trees.indexOf( t => t._id == tree._id );
    if(treeIndex == -1){
      return res.status(404).send("This user doesn\'t own this tree")
    } else{
      var trees = user.tree.splice(treeIndex, 1);
    }      

    const updatedUser = await User.findOneAndUpdate({ 'username': req.params.username }, { $set: trees }, { new: true });
    if(!updatedUser) return res.status(500).send("There was a problem with updating user info.");
    res.status(200).send(updatedUser);
  } catch (err){
    if(err) return res.status(500).send('Server couldn\'t delete tree from database');
  }
});

module.exports = router;
