var path = require('path');

const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, "data", "data.db");
const db = new sqlite3.Database(dbPath, err => {
    if (err) {
        return console.error(err.message);
    }
});

function getCards(status, onSelected) {
    const query = "select * from card_item where card_status=? order by card_id";
    db.all(query, [status], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        onSelected(rows);
    })
}

function getCardStatus(onSelected) {
    const query = "select * from card_status order by card_status";
    db.all(query, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        onSelected(rows);
    })
}

function getCategories(onSelected) {
    const query = "select * from category order by parent_category_id";
    db.all(query, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        onSelected(rows);
    })
}

module.exports = {
    getCards,
    getCardStatus,
    getCategories
};
