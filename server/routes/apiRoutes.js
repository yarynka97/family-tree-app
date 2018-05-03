const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const router = require('express').Router();
const config = require('../../config');

var treeCollection;
var connected = false;

MongoClient.connect(config.db_url, (err, client) => {
    if (err) return console.log(err)
    treeCollection = client.db('family-tree-app').collection('trees');
    connected = true;
    console.log('Connected to DB');
})

router.get('/getTree/:login', function (req, res) {
    if (connected) {
        treeCollection.findOne({
            login: req.params.login
        } , function(err, result) {
                console.log(result.tree);
                res.send(result.tree);
        });
    } else {
        console.log("no db connection");
    }
});

router.post('/login', function (req, res) {
    if (connected) {
        var login = req.body.login;
        var psw = req.body.psw;
        treeCollection.findOne({ login: login }, function (err, result) {
            if (result.password === psw) {
                console.log(result);
                res.send("Success");
            } else {
                console.log("Wrong password");
                res.status(405).send("Wrong password");
            }

        });
    } else {
        console.log("no db connection");
    }
});

router.post('/addTree', (req, res) => {
    if (connected) {
        console.log(req.body.login);
        treeCollection.find({ login: req.body.login }).toArray(function (err, result) {
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
    } else {
        console.log("no db connection");
    }
});


router.put('/updateTree/:userName', (req, res) => {
    treeCollection.findOneAndUpdate({ login: req.params.userName }, {
        $set: {
            tree: req.body.newTree
        }
    }, { upsert: false }, (err, result) => {
        if (err) return res.send(err)
        console.log(result);
        res.send(result)
    });
});

router.delete('/deleteTree/:userName', (req, res) => {
    treeCollection.findOneAndUpdate({ login: req.params.userName }, {
        $set: {
            tree: {}
        }
    }, { upsert: false }, (err, result) => {
        if (err) return res.send(err)
        console.log(result);
        res.send(result)
    });
});

router.get('*', function (req, res) {
    res.status(404).send('No such route');
});

module.exports = router;