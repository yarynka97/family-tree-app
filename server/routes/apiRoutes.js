const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const router = require('express').Router();
const config = require('../../config');

var db;

MongoClient.connect(`mongodb://${config.db.user}:${config.db.psw}@ds111410.mlab.com:11410/family-tree-app`, (err, client) => {
    if (err) return console.log(err)
    db = client.db('family-tree-app');
})

router.get('/getTree/:userName', function (req, res) {
    db.collection('trees').find( { name: req.params.userName } ).toArray(function (err, result) {
        console.log(result);
        res.send(result);
    });
});

router.post('/addTree', (req, res) => {
    console.log(req.body);
    db.collection('trees').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database');
        res.send("tree added");
        res.redirect('/');
    });
});

router.get('*', function (req, res) {
    res.send('no such route');
});

module.exports = router;