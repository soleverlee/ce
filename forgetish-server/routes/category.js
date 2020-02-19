var express = require('express');
var router = express.Router();
var db = require('./shared/db');

class TreeBuilder {
  constructor(categories, cards) {
    this.categoryRows = categories;
    this.cardRows = cards;
  }

  build() {
    let rootNodes = this.getChildCategories(null);
    return rootNodes.map(node => this.buildTreeNode(node));
  }

  getChildCategories(parentCategory) {
    return this.categoryRows.filter(category => category.parent_category === parentCategory)
      .map(category => this.buildTreeNode(category));
  }

  buildTreeNode(category) {
    let children = this.getChildCategories( category.name);
    let cards = this.cardRows.filter(card => card.category === category.name)
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
}

router.get('/', async function (req, res) {
  const categoryRows = await db.getCategories();
  const cardRows = await db.getAllCards();
  const categories = categoryRows.map(row => {
    return {
      name: row.name,
      parent_category: row.parent_category
    };
  });
  const tree = new TreeBuilder(categories, cardRows).build();
  res.send(tree);
});

module.exports = router;
