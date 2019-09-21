const db = require("../../data/dbConfig.js");

module.exports = { add, getAll, findById, removeById };

async function add(bread) {
  const [id] = await db("breads").insert(bread);
  return findById(id);
}

function getAll() {
  return db("breads");
}

function findById(id) {
  return db("breads")
    .where({ id })
    .first();
}

function removeById(id) {
  return db("breads")
    .where({ id: id })
    .del();
}
