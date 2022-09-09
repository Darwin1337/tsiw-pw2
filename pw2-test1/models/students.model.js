const sql = require("./db.js");

const Student = {};

Student.getAll = (qry, result) => {
    try {
        if (qry.course && qry.gender) {
            sql.query("SELECT * FROM students WHERE course like '%" + qry.course + "%' and gender=" + qry.gender + ";", (err, res) => err ? result(err, null) : result(null, res));
        }
    } catch {
        sql.query("SELECT * FROM students", (err, res) => err ? result(err, null) : result(null, res));
    }
}

Student.add = (student, result) => {
    sql.query("INSERT INTO students VALUES (?, ?, ?, ?);", [student.number, student.name, student.gender, student.course], (err, res) => err ? result(err, null) : result(null, res));
}

Student.findByCourse = (course, result) => {
    sql.query("SELECT * FROM students WHERE course=?", course, (err, res) => err ? result(err, null) : result(null, res));
};

Student.changeCourse = (student, result) => {
    console.log(student.number + " " + student.course);
    sql.query("UPDATE students SET course=? WHERE number=?", [student.course, student.number], (err, res) => err ? result(err, null) : result(null, res));
};

module.exports = Student;
