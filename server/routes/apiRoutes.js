const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const router = require('express').Router();
const config = require('../../config');

var treeCollection;

MongoClient.connect(`mongodb://${config.db.user}:${config.db.psw}@ds111410.mlab.com:11410/family-tree-app`, (err, client) => {
    if (err) return console.log(err)
    treeCollection = client.db('family-tree-app').collection('trees');
    console.log('Connected to DB');
})

router.get('/getTree/:userName', function (req, res) {
    treeCollection.find( { name: req.params.userName } ).toArray(function (err, result) {
        console.log(result);
        res.send(result);
    });
});

router.post('/addTree', (req, res) => {
    console.log(req.body.name);
    treeCollection.find({name : req.body.name}).toArray(function (err, result) {
        console.log(result);
        if (result[0]) {
            res.status(405).send("User already exist");
        } else {
            treeCollection.save(req.body, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                    return console.log(err);
                }

                console.log('Saved to database');
                res.send("Tree added");
            });
        }
    });
   
});

router.get('*', function (req, res) {
    res.status(404).send('No such route');
});

module.exports = router;