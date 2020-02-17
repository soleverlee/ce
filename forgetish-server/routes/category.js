var express = require('express');
var router = express.Router();
var db = require('./shared/db');

function buildTree(categories) {
  let rootNodes = filter(categories, null);
  return rootNodes.map(node => buildNode(categories, node));
}

function buildNode(categories, category) {
  return {
    name: category.name,
    children: filter(categories, category.name)
  };
}

function filter(categories, parentCategory) {
  return categories.filter(category => category.parent_category === parentCategory)
    .map(category => buildNode(categories, category));
}

router.get('/', function (req, res) {
  db.getCategories(rows => {
    let categories = rows.map(row => {
      return {
        name: row.name,
        parent_category: row.parent_category
      };
    });
    console.log(categories);
    let tree = buildTree(categories);
    res.send(tree);
  });
});

module.exports = router;
