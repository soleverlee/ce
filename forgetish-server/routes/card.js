var express = require('express');
var router = express.Router();
var db = require('./shared/db');


router.get('/', function (req, res) {
  db.getCards(rows => {
    console.log(rows);
    let result = rows.map(row => {
      return {
        cardId: row.card_id,
        title: row.title,
        description: row.description,
        cardStatus: row.card_status,
        createTime: row.createTime,
      };
    });
    res.send(result);
  });
});

router.get('/all_status', function (req, res) {
  db.getCardStatus(rows => {
    let result = rows.map(row => {
      return {
        cardStatus: row.card_status,
        display: row.display === 1,
        name: row.name,
      };
    });
    res.send(result);
  });
});

module.exports = router;
