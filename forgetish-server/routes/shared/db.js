var path = require('path');

const sqlite = require('sqlite-async');

const dbPath = path.join(__dirname, "data", "data.db");

let dbInstance;

async function getDatabase() {
  if (!dbInstance) {
    dbInstance = await sqlite.open(dbPath);
  }
  return dbInstance;
}

async function executeQuery(sql, params = []) {
  const db = await getDatabase();
  return db.all(sql, params);
}

async function getAllCards() {
  return executeQuery("select * from card_item order by card_id");
}

async function getCards(status) {
  const query = "select * from card_item where card_status=? order by rank, card_id";
  return executeQuery(query, [status]);
}

async function getCardStatus() {
  return executeQuery("select * from card_status order by card_status");
}

async function getCategories() {
  return executeQuery("select * from category order by parent_category");
}

async function createCategory(name, parentCategory) {
  const db = await getDatabase();
  return db.run("insert into category(name, parent_category) values (?, ?)", name, parentCategory);
}

async function moveCategory(name, newParentCategory) {
  const db = await getDatabase();
  return db.run("update category set parent_category=? where name=?", newParentCategory, name);
}

async function moveCard(id, category) {
  const db = await getDatabase();
  return db.run("update card_item set category=? where card_id=?", category, id);
}

async function updateCardStatus(id, status) {
  const db = await getDatabase();
  return db.run("update card_item set card_status=? where card_id=?", status, id);
}

async function updateCardRanking(rankmapping) {
  const db = await getDatabase();
  const statement = await db.prepare("update card_item set rank=? where card_id=?");
  for (let i = 0; i < rankmapping.length; i++){
    console.log('->', rankmapping[i].rank, rankmapping[i].id);
    await statement.run(rankmapping[i].rank, rankmapping[i].id);
  }
  return statement.finalize();
}


async function removeCategory(name) {
  const db = await getDatabase();
  return db.run("delete from category where name=?", name);
}

async function removeCard(id) {
  const db = await getDatabase();
  return db.run("delete from card_item where card_id=?", id);
}

module.exports = {
  getCards,
  getAllCards,
  updateCardStatus,
  updateCardRanking,
  getCardStatus,
  getCategories,
  createCategory,
  moveCategory,
  removeCategory,
  moveCard,
  removeCard,
};
