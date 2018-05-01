var path = require('path');
var router = require('express').Router();

router.get('/getTree/:userName', function (req, res) {
    res.send(req.params.userName+' says Hello');
});

module.exports = router;