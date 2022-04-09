const sql = require("./db.js");

const Tutorial = function (tutorial) {
    this.title = tutorial.email;
    this.description = tutorial.description;
    this.published = tutorial.published;
};

Tutorial.getAll = (qry, result) => {
    sql.query(qry ? "SELECT * FROM Tutorials WHERE title like '%" + qry + "%';" : "SELECT * FROM Tutorials;", (err, res) => err ? result(err, null) : result(null, res));
};

Tutorial.create = (tutorial, result) => {
    sql.query("INSERT INTO Tutorials (title, description, published) VALUES (?, ?, ?);", [tutorial.title, tutorial.description, tutorial.published], (err, res) => err ? result(err, null) : result(null, res));
};

Tutorial.findById = (id, result) => {
    sql.query("SELECT * FROM Tutorials WHERE id=?", id, (err, res) => err ? result(err, null) : result(null, res));
};

Tutorial.updateById = (tutorial, result) => {
    sql.query("UPDATE Tutorials SET title = ?, description = ?, published = ? WHERE id=?", [tutorial.title, tutorial.description, tutorial.published, tutorial.id], (err, res) => err ? result(err, null) : result(null, res));
};

Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM Tutorials WHERE id=?;", id, (err, res) => err ? result(err, null) : result(null, res));
};

Tutorial.getAllPublished = (result) => {
    sql.query("SELECT * FROM Tutorials WHERE published=1;", (err, res) => err ? result(err, null) : result(null, res));
};

module.exports = Tutorial;