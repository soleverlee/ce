var express = require('express');
var router = express.Router();
var db = require('./shared/db');


router.get('/', function (req, res) {
    db.getCards(rows => {
        res.send(rows);
    });
});

router.get('/all_status', function (req, res) {
    db.getCardStatus(rows => {
        res.send(rows);
    });
});

module.exports = router;
