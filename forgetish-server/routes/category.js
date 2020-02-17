var express = require('express');
var router = express.Router();
var db = require('./shared/db');

function buildTree(categories, cardRows) {
  let rootNodes = getChildCategories(categories, null, cardRows);
  return rootNodes.map(node => buildNode(categories, node, cardRows));
}

function buildNode(categories, category, cardRows) {
  let children = getChildCategories(categories, category.name, cardRows);
  let cards = cardRows.filter(card => card.category === category.name)
    .map(card => {
      return {
        name: card.title,
        type: 'card',
        rawCard: card,
        children: [],
      }
    });
  return {
    name: category.name,
    type: 'category',
    children: children.concat(cards),
  };
}

function getChildCategories(categories, parentCategory, cardRows) {
  return categories.filter(category => category.parent_category === parentCategory)
    .map(category => buildNode(categories, category, cardRows));
}

router.get('/', function (req, res) {
  db.getCategories(categoryRows => {
    db.getAllCards(cardRows => {
      let categories = categoryRows.map(row => {
        return {
          name: row.name,
          parent_category: row.parent_category
        };
      });
      let tree = buildTree(categories, cardRows);
      res.send(tree);
    });
  });
});

module.exports = router;
