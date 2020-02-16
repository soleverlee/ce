var express = require('express');
var router = express.Router();
var db = require('./shared/db');


router.get('/', function (req, res) {
    db.getCategories(rows => {
        res.send(rows);
    });
});

module.exports = router;
