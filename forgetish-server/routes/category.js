var express = require('express');
var router = express.Router();
var db = require('./shared/db');

function buildTree(categories) {
  let rootNodes = filter(categories, null);
  return rootNodes.map(node => buildNode(categories, node));
}

function buildNode(categories, category) {
  return {
    id: category.id,
    name: category.name,
    children: filter(categories, category.id)
  };
}

function filter(categories, parentId) {
  return categories.filter(category => category.parent_id === parentId);
}

router.get('/', function (req, res) {
  db.getCategories(rows => {
    let categories = rows.map(row => {
      return {
        id: row.category_id,
        name: row.name,
        parent_id: row.parent_category_id
      };
    });
    console.log(categories);
    let tree = buildTree(categories);
    res.send(tree);
  });
});

module.exports = router;
