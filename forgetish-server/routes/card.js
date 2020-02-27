var express = require('express');
var router = express.Router();
var db = require('./shared/db');


router.get('/', async function (req, res) {
  const rows = await db.getCards(req.query.status);
  const result = rows.map(row => {
    return {
      cardId: row.card_id,
      category: row.category,
      title: row.title,
      description: row.description,
      cardStatus: row.card_status,
      createTime: row.createTime,
    };
  });
  res.send(result);
});

router.get('/all_status', async function (req, res) {
  const rows = await db.getCardStatus();
  const result = rows.map(row => {
    return {
      cardStatus: row.card_status,
      display: row.display === 1,
      name: row.name,
    };
  });
  res.send(result);
});

router.post('/move', async function (req, res) {
  const {id, category} = req.body;
  const rows = await db.moveCard(id, category);
  res.send(rows);
});

router.post('/remove', async function (req, res) {
  const {id} = req.body;
  const rows = await db.removeCard(id);
  res.send(rows);
});

router.post('/updateStatus', async function (req, res) {
  const {id, status} = req.body;
  const rows = await db.updateCardStatus(id, status);
  res.send(rows);
});

router.post('/updateRank', async function (req, res) {
  const rows = await db.updateCardRanking(req.body);
  res.send(rows);
});

router.post('/', async function (req, res) {
  const {category, title, description} = req.body;
  const rows = await db.createCard(category, title, description);
  res.send(rows);
});

router.post('/update', async function (req, res) {
  const {id, category, title, description} = req.body;
  const rows = await db.updateCard(id, category, title, description);
  res.send(rows);
});

router.post('/delete', async function (req, res) {
  const {id} = req.body;
  const rows = await db.removeCard(id);
  res.send(rows);
});

module.exports = router;
